import { BigNumber } from '0x.js';
import { useMemo } from 'react';

import { IPaymentOrder, IBlockChainPaymentOrder } from 'shared/types/models';
import { OneDAI } from 'shared/model/calculate';
import { useDrizzle } from 'shared/helpers/react';
import checkDrizzleResponse from 'shared/helpers/CheckDrizzleResponse';
import { mainContractName } from 'shared/constants';

interface IChildrenProps {
  orders: IPaymentOrder[];
  ordersLoading: boolean;
}

export default function usePaymentOrders(tokenId: string): IChildrenProps {
  const { drizzle, drizzleState } = useDrizzle();
  const contract = drizzle.contracts[mainContractName];
  const contractState = drizzleState.contracts[mainContractName];

  const keyForOrderIds = useMemo(
    () => contract.methods.getOrdersList.cacheCall(tokenId.toString()),
    [tokenId],
  );

  const orderIdsResponse = contractState.getOrdersList[keyForOrderIds];
  const orderIds = useMemo(
    () => checkDrizzleResponse<string[], string[]>(orderIdsResponse, []),
    [orderIdsResponse],
  );

  const keysForOrders = useMemo(() => {
    return orderIds.map(id => ({
      key: contract.methods.getByOrderId.cacheCall(tokenId.toString(), id),
      id,
    }));
  }, [orderIds]);

  const orders = useMemo(() => keysForOrders.map(({ key, id }) => {
    const orderResponse = contractState.getByOrderId[key];
    const order = checkDrizzleResponse<IBlockChainPaymentOrder, null>(orderResponse, null);
    return order ? convertOrderResponse(order, id) : null;
  }), [contractState.getByOrderId, keysForOrders]);

  const filteredOrders = useMemo(() => orders.filter(order => order), [orders]) as IPaymentOrder[];

  const ordersLoading = !orderIds || orders.some(order => !order);

  return useMemo(() => ({
    orders: filteredOrders,
    ordersLoading,
  }), [filteredOrders, ordersLoading]);
}

function convertOrderResponse(order: IBlockChainPaymentOrder, id: string): IPaymentOrder {
  return {
    id: Number(id),
    subscriber: order.subscriber,
    pendingDatePayment: Number(order.pendingDatePayment) * 1000,
    datePayment: Number(order.datePayment) * 1000,
    amount: (new BigNumber(order.amount)).div(OneDAI),
    isPayed: order.isPayed,
    isDeleted: order.isDeleted,
  };
}
