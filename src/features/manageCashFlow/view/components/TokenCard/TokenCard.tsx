import * as React from 'react';
import { bind } from 'decko';
import * as moment from 'moment';
import cn from 'classnames';
import { BigNumber } from '0x.js';
import { Web3Wrapper } from '@0x/web3-wrapper';

import { ShowMainContractData, WithOrders, SendTransactionButton } from 'services/transactions';
import { i18nConnect, ITranslateProps, tKeys as tKeysAll } from 'services/i18n';
import { SellButton } from 'features/sellCashFlow';
import { BuyButton } from 'features/buyCashFlow';

import { IToken, TokenType, IOrder } from 'shared/types/models';
import { ExpansionPanel, ExpansionPanelDetails, Button, DonutChart, ExpansionPanelSummary } from 'shared/view/elements';
import { ContentCopy, CircleArrow } from 'shared/view/elements/Icons';
import { toFixed } from 'shared/helpers/integer';
import { formatNumber } from 'shared/helpers/format';

import Header from './Header/Header';
import { StylesProps, provideStyles } from './TokenCard.style';
import { PayButton } from 'features/payInstalment';
import { DECIMAL } from 'shared/constants';

const tKeys = tKeysAll.features.manageCashFlows;

type MetricKey =
  keyof Pick<IToken, 'id' | 'payer' | 'instalmentSize' | 'firstInstalmentDate' | 'lastInstalmentDate'> | 'lender';

interface IOwnProps {
  className?: string;
  tokenId: number;
  order?: IOrder;
  type: TokenType;
  expanded: boolean;
  price?: BigNumber;
  onToggle(id: number): void;
  isNeedDisplay?(token: IToken): boolean;
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class TokenCard extends React.PureComponent<IProps> {
  public render() {
    const { classes, className, type, expanded, t, theme, isNeedDisplay, tokenId, price, order } = this.props;

    return (
      <ShowMainContractData<'cashflowFor'> type="cashflowFor" request={{ tokenId }}>
        {({ data: token }) => {
          if (!token) { return 'Token loading...'; }
          if (isNeedDisplay && !isNeedDisplay(token)) { return null; }

          const { instalmentSize, amount } = token;
          const paidAmount = 100; // TODO ds: calculate from orders
          const missedAmount = 100; // TODO ds: calculate from orders
          const dueAmount = 100; // TODO ds: calculate from orders
          const paidPercent = toFixed(paidAmount / instalmentSize.toNumber(), 1);

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
                      <DonutChart
                        title={t(
                          tKeys.howMuchInstalmentIsComplete.getKey(),
                          { paid: paidAmount, total: amount.toNumber(), percent: paidPercent },
                        )}
                        total={amount.toNumber()}
                        segments={[
                          { color: theme!.extra.colors.salem, value: paidAmount },
                          { color: theme!.extra.colors.monza, value: missedAmount },
                          { color: theme!.extra.colors.buttercup, value: dueAmount },
                        ]}
                      />
                    </div>
                  </div>
                  <SendTransactionButton<'createOrder'>
                    variant="outlined"
                    type="createOrder"
                    data={{ tokenId, tokenAmount: Web3Wrapper.toBaseUnitAmount(new BigNumber(1), DECIMAL) }}
                  >
                    createOrder
                  </SendTransactionButton>
                  <SendTransactionButton<'executePayment'>
                    variant="outlined"
                    type="executePayment"
                    data={{ tokenId, tokenAmount: Web3Wrapper.toBaseUnitAmount(new BigNumber(1), DECIMAL) }}
                  >
                    executePayment
                  </SendTransactionButton>

                  <SendTransactionButton<'executeOrder'>
                    variant="outlined"
                    type="executeOrder"
                    data={{ tokenId, orderId: 1 }}
                  >
                    executeOrder
                  </SendTransactionButton>
                  {['Repayment history', 'Withdrawal history'].map(stub => (
                    <div key={stub} className={classes.stubSection}>
                      <span>{stub}</span>
                      <CircleArrow />
                    </div>
                  ))}

                  <WithOrders tokenId={token.id}>
                    {(data) => {
                      console.log(data)
                      return (
                        <div />

                      );
                    }}
                  </WithOrders>
                </ExpansionPanelDetails>
                <div className={classes.footer}>
                  {this.renderActions(token, order)}
                </div>
              </ExpansionPanel>
            </div>
          );
        }}
      </ShowMainContractData>
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

  public renderActions(token: IToken, order?: IOrder) {
    const { classes, t, type } = this.props;
    const onSaleNow: boolean = false; // TODO ds: check token on sale
    const isFullRepaid: boolean = false; // TODO ds: check full repaid

    const withdrawButton = (
      <Button className={classes.footerButton} variant="contained" color="primary">
        {t(tKeys.withdrawDai.getKey())}
      </Button>
    );
    const sellButton = (
      <div className={classes.footerButton}>
        <SellButton cashflow={token} disabled={onSaleNow} />
      </div>
    );

    // const payButton = (
    //   <WithOrders tokenId={token.id}>
    //     {(data) => {
    //       return (
    //         <div className={classes.footerButton}>
    //           <PayButton
    //             type={data.orderId ? 'current' : 'advance'}
    //             tokenId={token.id}
    //             tokenAmount={token.instalmentSize.toNumber()}
    //             orderId={data.orderId}
    //           />
    //         </div>
    //       );
    //     }}
    //   </WithOrders>);

    switch (type) {
      case 'incoming':
        return (
          <>
            {sellButton}
            {!onSaleNow && withdrawButton}
          </>
        );
      case 'obligations':
        return (
          <>
            {/* {payButton} */}
            {sellButton}
            {!onSaleNow && isFullRepaid && withdrawButton}
          </>
        );
      case 'selling':
        return !!order && (
          <div className={classes.footerButton}>
            <BuyButton cashflow={token} order={order} disabled={onSaleNow} />
          </div>
        );
    }
  }
}

export default i18nConnect(provideStyles(TokenCard));
