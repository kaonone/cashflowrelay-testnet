import * as React from 'react';
import { bind } from 'decko';
import * as moment from 'moment';
import cn from 'classnames';
import { BigNumber } from '0x.js';

import { ShowMainContractData, WithOrders } from 'services/transactions';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { SellButton } from 'features/sellCashFlow';
import { BuyButton } from 'features/buyCashFlow';
import { PayButton } from 'features/payInstalment';
import { WithdrawButton } from 'features/withdrawCashFlow';

import { IToken, TokenType, IOrder, IPaymentOrder } from 'shared/types/models';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'shared/view/elements';
import { ContentCopy, CircleArrow } from 'shared/view/elements/Icons';
import { formatNumber } from 'shared/helpers/format';

import Header from './Header/Header';
import { StylesProps, provideStyles } from './TokenCard.style';
import InstalmentsChart from './InstalmentsChart/InstalmentsChart';

const tKeys = tKeysAll.features.manageCashFlows;

type MetricKey =
  keyof Pick<IToken, 'id' | 'payer' | 'instalmentSize' | 'firstInstalmentDate' | 'lastInstalmentDate'> | 'lender';

interface IOwnProps {
  className?: string;
  tokenId: number;
  account: string | null;
  order?: IOrder;
  type: TokenType;
  expanded: boolean;
  price?: BigNumber;
  onToggle(id: number): void;
  isNeedDisplay?(token: IToken): boolean;
}

interface IInstalments {
  paidInstallments: IPaymentOrder[];
  dueInstallments: IPaymentOrder[];
  missedInstallments: IPaymentOrder[];
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class TokenCard extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, type, expanded, isNeedDisplay, tokenId, price, order, account } = this.props;

    return (
      <WithOrders tokenId={tokenId}>
        {({ orders }) => (
          <ShowMainContractData<'cashflowFor'> type="cashflowFor" request={{ tokenId }}>
            {({ data: token }) => {
              if (!token) { return 'Token loading...'; }
              if (isNeedDisplay && !isNeedDisplay(token)) { return null; }
              const { amount } = token;
              const instalments = this.getInstalments(orders);
              const instalmentsCount = this.getInstalmentsCount(instalments);
              const instalmentsAmount = this.getInstalmentsAmount(instalments);
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
                        instalments={instalmentsCount}
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
                            payed={instalmentsAmount.paidInstallmentsAmount}
                            due={instalmentsAmount.dueInstallmentsAmount}
                            missed={instalmentsAmount.missedInstallmentsAmount}
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
                      {this.renderActions(token, account, order)}
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

  public renderActions(token: IToken, account: string | null, order?: IOrder) {
    const { classes, type } = this.props;
    const onSaleNow: boolean = false; // TODO ds: check token on sale
    const isFullRepaid: boolean = false; // TODO ds: check full repaid

    return (
      <ShowMainContractData<'ownerOf'> type="ownerOf" request={{ tokenId: token.id }}>
        {({ data: owner }) => {
          if (!owner || !account) { return null; }

          const isMyToken = owner.toLowerCase() === account.toLowerCase();

          const withdrawButton = isMyToken && !onSaleNow && (
            <div className={classes.footerButton}>
              <WithdrawButton token={token} />
            </div>
          );
          const sellButton = isMyToken && (
            <div className={classes.footerButton}>
              <SellButton cashflow={token} disabled={onSaleNow} />
            </div>
          );
          const payInstallmentButton = !isFullRepaid && (
            <div className={classes.footerButton}>
              <PayButton token={token} variant={isMyToken ? 'outlined' : 'contained'} />
            </div>
          );
          const buyButton = !!order && !isMyToken && (
            <div className={classes.footerButton}>
              <BuyButton cashflow={token} order={order} />
            </div>
          );

          const renderByType: Record<TokenType, () => React.ReactNode> = {
            incoming: () => (<>
              {sellButton}
              {withdrawButton}
            </>),
            obligations: () => (<>
              {payInstallmentButton}
              {sellButton}
              {isFullRepaid && withdrawButton}
            </>),
            selling: () => <>{buyButton}</>,
          };

          return renderByType[type]();
        }}
      </ShowMainContractData>
    );
  }

  @bind
  private getInstalments(orders: IPaymentOrder[]) {
    const today = Date.now();
    const paidInstallments = orders.filter(order => order.isPayed);
    const dueInstallments = orders.filter(({ isPayed, isDeleted, pendingDatePayment }) => {
      const deadline = moment(pendingDatePayment).add(30, 'days').valueOf();
      return !isDeleted && !isPayed && pendingDatePayment < today && today < deadline;
    });
    const missedInstallments = orders.filter(({ isPayed, isDeleted, pendingDatePayment }) => {
      const deadline = moment(pendingDatePayment).add(30, 'days').valueOf();
      return !isDeleted && !isPayed && deadline < pendingDatePayment;
    });
    return { paidInstallments, dueInstallments, missedInstallments };
  }

  @bind
  private getInstalmentsCount({ paidInstallments, dueInstallments, missedInstallments }: IInstalments) {
    return {
      paidInstallments: paidInstallments.length,
      dueInstallments: dueInstallments.length,
      missedInstallments: missedInstallments.length,
    };
  }

  @bind
  private getInstalmentsAmount({ paidInstallments, dueInstallments, missedInstallments }: IInstalments) {
    const paidInstallmentsAmount = paidInstallments
      .reduce((summ, instalment) => summ + instalment.amount.toNumber(), 0);

    const dueInstallmentsAmount = dueInstallments
      .reduce((summ, instalment) => summ + instalment.amount.toNumber(), 0);

    const missedInstallmentsAmount = missedInstallments
      .reduce((summ, instalment) => summ + instalment.amount.toNumber(), 0);

    return { paidInstallmentsAmount, dueInstallmentsAmount, missedInstallmentsAmount };
  }
}

export default i18nConnect(provideStyles(TokenCard));
