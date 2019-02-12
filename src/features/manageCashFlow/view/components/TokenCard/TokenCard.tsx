import * as React from 'react';
import { bind } from 'decko';
import * as moment from 'moment';
import cn from 'classnames';
import { BigNumber } from '0x.js';

import { ShowMainContractData, WithOrders } from 'services/transactions';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';

import { IToken, TokenType, IOrder } from 'shared/types/models';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'shared/view/elements';
import { ContentCopy, CircleArrow } from 'shared/view/elements/Icons';
import { formatNumber } from 'shared/helpers/format';

import Header from './Header/Header';
import { StylesProps, provideStyles } from './TokenCard.style';
import InstalmentsChart from './InstalmentsChart/InstalmentsChart';
import Actions from './Actions/Actions';
import {
  groupInstallmentsByPaymentStatus, calcInstallmentsCount, calcInstallmentsAmount, groupInstallmentsByPaymentDate,
} from 'shared/helpers/model';

const tKeys = tKeysAll.features.manageCashFlows;

type MetricKey =
  keyof Pick<IToken, 'id' | 'payer' | 'instalmentSize' | 'firstInstalmentDate' | 'lastInstalmentDate'> | 'lender';

interface IOwnProps {
  className?: string;
  tokenId: string;
  account: string | null;
  marketOrder?: IOrder;
  type: TokenType;
  expanded: boolean;
  price?: BigNumber;
  onToggle(id: string): void;
  isNeedDisplay?(token: IToken): boolean;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class TokenCard extends React.PureComponent<IProps> {
  public render() {
    const {
      classes, className, type, expanded, isNeedDisplay, tokenId, price, marketOrder: order, account,
    } = this.props;

    return (
      <WithOrders tokenId={tokenId}>
        {({ orders, ordersLoading }) => (
          <ShowMainContractData<'cashflowFor'> type="cashflowFor" request={{ tokenId }}>
            {({ data: token }) => {
              if (!token) { return 'Token loading...'; }
              if (isNeedDisplay && !isNeedDisplay(token)) { return null; }
              const { amount } = token;
              const installmentsCountForHeader = calcInstallmentsCount(groupInstallmentsByPaymentStatus(orders));
              const installmentsAmountForPieCart = calcInstallmentsAmount(groupInstallmentsByPaymentDate(orders));
              return (
                <div className={cn(classes.root, className)}>
                  <ExpansionPanel expanded={expanded} onChange={this.onToggle}>
                    <ExpansionPanelSummary
                      className={classes.summary}
                      classes={{ content: classes.summaryContent }}
                    >
                      <Header
                        token={token}
                        expanded={expanded}
                        type={type}
                        price={price}
                        instalments={installmentsCountForHeader}
                      />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails className={classes.details}>
                      <div className={classes.main}>
                        <div className={classes.leftSection} >
                          {(['id', 'payer', 'lender'] as MetricKey[]).map(this.renderMetric.bind(null, token))}
                        </div>
                        <div className={classes.rightSection}>
                          {(['instalmentSize', 'firstInstalmentDate', 'lastInstalmentDate'] as MetricKey[])
                            .map(this.renderMetric.bind(null, token))}
                        </div>
                        <div className={classes.progress}>
                          <InstalmentsChart
                            totalInstalments={amount.toNumber()}
                            payed={installmentsAmountForPieCart.paid}
                            due={installmentsAmountForPieCart.due}
                            missed={installmentsAmountForPieCart.missed}
                          />
                        </div>
                      </div>
                      {['Repayment history', 'Withdrawal history'].map(stub => (
                        <div key={stub} className={classes.stubSection}>
                          <span>{stub}</span>
                          <CircleArrow />
                        </div>
                      ))}
                    </ExpansionPanelDetails>
                    <div className={classes.footer}>
                      <Actions
                        account={account}
                        buttonClass={classes.footerButton}
                        marketOrder={order}
                        token={token}
                        type={type}
                        paymentOrders={orders}
                        paymentOrdersLoading={ordersLoading}
                      />
                    </div>
                  </ExpansionPanel>
                </div>
              );
            }}
          </ShowMainContractData>
        )}
      </WithOrders>
    );
  }

  @bind
  public onToggle() {
    const { tokenId, onToggle } = this.props;
    onToggle(tokenId);
  }

  @bind
  public renderMetric(token: IToken, key: MetricKey) {
    const { classes, t } = this.props;
    const valueByMetricKey: Record<MetricKey, () => React.ReactNode> = {
      id: () => token.id,
      firstInstalmentDate: () => moment(token.firstInstalmentDate).format('LL'),
      lastInstalmentDate: () => moment(token.lastInstalmentDate).format('LL'),
      instalmentSize: () => t(tKeys.amountPerPeriodicity.getKey(), {
        amount: formatNumber(token.instalmentSize.toNumber(), 2),
        periodicity: moment.duration(token.periodDuration).humanize(),
      }),
      payer: () => token.payer,
      lender: () => (
        <ShowMainContractData<'ownerOf'> type="ownerOf" request={{ tokenId: token.id }}>
          {({ data }) => data || 'Loading...'}
        </ShowMainContractData>
      ),
    };

    return (
      <div key={key} className={classes.metricField}>
        <div className={classes.metricTitle}>
          {t(tKeys[key].getKey())}
        </div>
        <div className={classes.metricValue}>
          {valueByMetricKey[key]()}
          {(key === 'lender' || key === 'payer') && (<>
            <ContentCopy className={classes.icon} />
          </>)}
        </div>
      </div>
    );
  }
}

export default i18nConnect(provideStyles(TokenCard));
