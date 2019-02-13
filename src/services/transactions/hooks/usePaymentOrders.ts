import { BigNumber } from '0x.js';
import { useState, useEffect, useMemo } from 'react';

import { IPaymentOrder, IBlockChainPaymentOrder } from 'shared/types/models';
import { OneDAI } from 'shared/helpers/model';
import { useDrizzle } from 'shared/helpers/react';
import checkDrizzleResponse from 'shared/helpers/CheckDrizzleResponse';
import { mainContractName } from 'shared/constants';

interface IChildrenProps {
  orders: IPaymentOrder[];
  ordersLoading: boolean;
}

export default function usePaymentOrders(tokenId: string): IChildrenProps {
  const [keyForOrderIds, setKeyForOrderIds] = useState('');
  const [keysForOrders, setKeysForOrders] = useState<Array<{ key: string, id: string }>>([]);
  const { drizzle, drizzleState } = useDrizzle();

  const contract = drizzle.contracts[mainContractName];
  const contractState = drizzleState.contracts[mainContractName];
  const orderIdsResponse = contractState.getOrdersList[keyForOrderIds];
  const orderIds = checkDrizzleResponse<string[], string[]>(orderIdsResponse, []);

  useEffect(() => {
    const nextKeyForOrderIds = contract.methods.getOrdersList.cacheCall(tokenId.toString());

    setKeyForOrderIds(nextKeyForOrderIds);
    setKeysForOrders([]);
  }, [tokenId]);

  useEffect(() => {
    const nextKeysForOrders = orderIds.map(id => ({
      key: contract.methods.getByOrderId.cacheCall(tokenId.toString(), id),
      id,
    }));
    setKeysForOrders(nextKeysForOrders);
  }, [orderIds]);

  const orders = useMemo(() => keysForOrders.map(({ key, id }) => {
    const orderResponse = contractState.getByOrderId[key];
    const order = checkDrizzleResponse<IBlockChainPaymentOrder, null>(orderResponse, null);
    return order ? convertOrderResponse(order, id) : null;
  }), [contractState.getByOrderId, keysForOrders]);

  const filteredOrders = useMemo(() => orders.filter(order => order), [orders]) as IPaymentOrder[];

  const ordersLoading = !orderIds || orders.some(order => !order);

  return {
    orders: filteredOrders,
    ordersLoading,
  };
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
