import { BigNumber } from '0x.js';

import { ICommunication, IAction, IPlainFailAction } from 'shared/types/redux';
import { IOrderList, IOrder } from 'shared/types/models';

export type TokenId = BigNumber;

export interface IReduxState {
  communication: {
    myOrdersLoading: ICommunication;
    allOrdersLoading: ICommunication;
  };
  data: {
    myOrders: IOrderList;
    orders: IOrderList;
    hideOrders: TokenId[];
  };
}

export interface InjectOrderbookProps {
  orders: IOrderList;
  ordersLoading: ICommunication;
  loadMore(): void;
}

export interface InjectMyOrderProps {
  order: IOrder | null;
  orderLoading: ICommunication;
}

export type ILoadMyOrders = IAction<'ORDERBOOK:LOAD_MY_ORDERS', { page?: number; perPage?: number }>;
export type ILoadMyOrdersSuccess = IAction<'ORDERBOOK:LOAD_MY_ORDERS_SUCCESS', IOrderList>;
export type ILoadMyOrdersFail = IPlainFailAction<'ORDERBOOK:LOAD_MY_ORDERS_FAIL'>;

export type ILoadOrders = IAction<'ORDERBOOK:LOAD_ORDERS', { page?: number; perPage?: number }>;
export type ILoadOrdersSuccess = IAction<'ORDERBOOK:LOAD_ORDERS_SUCCESS', IOrderList>;
export type ILoadOrdersFail = IPlainFailAction<'ORDERBOOK:LOAD_ORDERS_FAIL'>;

export type IHideOrder = IAction<'ORDERBOOK:HIDE_ORDER', TokenId>;

export type Action =
  | ILoadOrders
  | ILoadOrdersSuccess
  | ILoadOrdersFail
  | ILoadMyOrders
  | ILoadMyOrdersSuccess
  | ILoadMyOrdersFail
  | IHideOrder;
