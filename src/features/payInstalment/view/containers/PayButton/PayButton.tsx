import * as React from 'react';
import { Web3Wrapper } from '@0x/web3-wrapper';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { SendTransactionButton, usePaymentOrders } from 'services/transactions';
import { IPaymentOrder, IToken } from 'shared/types/models';
import { CircleProgressBar } from 'shared/view/elements';
import { calcIsFullRepaid } from 'shared/model/calculate';
import { DECIMAL } from 'shared/constants';

import { StylesProps, provideStyles } from './PayButton.style';

interface IOwnProps {
  token: IToken;
  variant: 'outlined' | 'contained';
}

type IProps = IOwnProps & StylesProps & ITranslateProps;

function PayButton(props: IProps) {
  const { classes, token, variant } = props;
  const { ordersLoading, orders } = usePaymentOrders(token.id);

  const isFullRepaid = calcIsFullRepaid(orders, token);
  const disabled = isFullRepaid || ordersLoading;

  const expiredOrder = getExpiredOrder(orders);

  const commonProps = {
    disabled,
    variant,
    color: 'primary' as 'primary',
    children: (
      <>
        Pay instalment
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
}

function getExpiredOrder(orders: IPaymentOrder[]): IPaymentOrder | null {
  const now = Date.now();
  return orders.find(order => !order.isPayed && !order.isDeleted && order.pendingDatePayment < now) || null;
}

export { PayButton };
export default i18nConnect(provideStyles(PayButton));
