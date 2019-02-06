import * as React from 'react';
import { BigNumber } from '0x.js';
import { Web3Wrapper } from '@0x/web3-wrapper';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { SendTransactionButton, WithOrders } from 'services/transactions';
import { IPaymentOrder, IToken } from 'shared/types/models';
import { CircleProgressBar } from 'shared/view/elements';
import { DECIMAL } from 'shared/constants';

import { StylesProps, provideStyles } from './PayButton.style';

interface IOwnProps {
  token: IToken;
  variant: 'outlined' | 'contained';
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

class PayButton extends React.PureComponent<IProps> {

  public render() {
    const { classes, token, variant } = this.props;

    return (
      <WithOrders tokenId={token.id}>
        {({ ordersLoading, orders }) => {
          const isFullRepaid = this.calcIsFullRepaid(orders, token);
          const disabled = isFullRepaid || ordersLoading;

          const expiredOrder = this.getExpiredOrder(orders);

          const commonProps = {
            disabled,
            variant,
            color: 'primary' as 'primary',
            children: (
              <>
                Pay installment
                {ordersLoading && <div className={classes.preloader}><CircleProgressBar size={22} /></div>}
              </>
            ),
          };

          if (expiredOrder) {
            return (
              <SendTransactionButton<'executeOrder'>
                type="executeOrder"
                data={{ tokenId: token.id, orderId: expiredOrder.id }}
                {...commonProps}
              />
            );
          }

          return (
            <SendTransactionButton<'executePayment'>
              type="executePayment"
              data={{ tokenId: token.id, amount: Web3Wrapper.toBaseUnitAmount(token.instalmentSize, DECIMAL) }}
              {...commonProps}
            />
          );
        }}
      </WithOrders>
    );
  }

  private calcIsFullRepaid(orders: IPaymentOrder[], token: IToken): boolean {
    const repaidAmount = orders
      .filter(order => order.isPayed)
      .map(order => order.amount)
      .reduce((cur, acc) => acc.plus(cur), new BigNumber(0));

    return repaidAmount.comparedTo(token.amount) >= 0;
  }

  private getExpiredOrder(orders: IPaymentOrder[]): IPaymentOrder | null {
    const now = Date.now();
    return orders.find(order => !order.isPayed && !order.isDeleted && order.pendingDatePayment < now) || null;
  }
}

export { PayButton };
export default i18nConnect(provideStyles(PayButton));
