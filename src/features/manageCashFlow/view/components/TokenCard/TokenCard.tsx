import * as React from 'react';
import * as moment from 'moment';
import cn from 'classnames';
import { BigNumber } from '0x.js';

import { useMainContractData, usePaymentOrders } from 'services/transactions';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';

import { IToken, TokenType, IOrder } from 'shared/types/models';
import { ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary } from 'shared/view/elements';
import { ContentCopy, CircleArrow } from 'shared/view/elements/Icons';
import { formatNumber } from 'shared/helpers/format';

import Header from './Header/Header';
import { StylesProps, provideStyles } from './TokenCard.style';
import InstalmentsChart from './InstalmentsChart/InstalmentsChart';
import Actions from './Actions/Actions';
import { calcInstallmentsAmount, groupInstallmentsByPaymentDate } from 'shared/model/calculate';

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

type IProps = IOwnProps & StylesProps;

function TokenCard(props: IProps) {
  const { classes, className, type, expanded, isNeedDisplay, tokenId, price, marketOrder: order, account } = props;
  const { data: token } = useMainContractData('cashflowFor', { tokenId });
  const { orders, ordersLoading } = usePaymentOrders(tokenId);

  const onToggle = React.useCallback(() => {
    props.onToggle(tokenId);
  }, []);

  if (!token) { return <span>Token loading...</span>; }
  if (isNeedDisplay && !isNeedDisplay(token)) { return null; }

  const { amount } = token;
  const installmentsAmountForPieCart = calcInstallmentsAmount(groupInstallmentsByPaymentDate(orders));

  return (
    <div className={cn(classes.root, className)}>
      <ExpansionPanel expanded={expanded} onChange={onToggle}>
        <ExpansionPanelSummary
          className={classes.summary}
          classes={{ content: classes.summaryContent }}
        >
          <Header
            token={token}
            expanded={expanded}
            type={type}
            price={price}
          />
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className={classes.details}>
          <div className={classes.main}>
            <div className={classes.leftSection} >
              {(['id', 'payer', 'lender'] as MetricKey[]).map(key => (
                <ConnectedMetric
                  key={key}
                  metricKey={key}
                  token={token}
                  theme={props.theme}
                  classes={classes}
                />
              ))}
            </div>
            <div className={classes.rightSection}>
              {(['instalmentSize', 'firstInstalmentDate', 'lastInstalmentDate'] as MetricKey[]).map(key => (
                <ConnectedMetric
                  key={key}
                  metricKey={key}
                  token={token}
                  theme={props.theme}
                  classes={classes}
                />
              ))}
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
}

type IMetricProps = ITranslateProps & StylesProps & {
  token: IToken;
  metricKey: MetricKey;
};

const ConnectedMetric = i18nConnect(function Metric(props: IMetricProps) {
  const { classes, t, token, metricKey } = props;
  const { data: owner } = useMainContractData('ownerOf', { tokenId: token.id });

  const valueByMetricKey: Record<MetricKey, () => React.ReactNode> = {
    id: () => token.id,
    firstInstalmentDate: () => moment(token.firstInstalmentDate).format('LL'),
    lastInstalmentDate: () => moment(token.lastInstalmentDate).format('LL'),
    instalmentSize: () => t(tKeys.amountPerPeriodicity.getKey(), {
      amount: formatNumber(token.instalmentSize.toNumber(), 2),
      periodicity: moment.duration(token.periodDuration).humanize(),
    }),
    payer: () => token.payer,
    lender: () => owner || 'Loading...',
  };

  return (
    <div className={classes.metricField}>
      <div className={classes.metricTitle}>
        {t(tKeys[metricKey].getKey())}
      </div>
      <div className={classes.metricValue}>
        {valueByMetricKey[metricKey]()}
        {(metricKey === 'lender' || metricKey === 'payer') && (<>
          <ContentCopy className={classes.icon} />
        </>)}
      </div>
    </div>
  );
});

export default provideStyles(TokenCard);
