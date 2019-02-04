import { ICommunication, IAction, IPlainFailAction } from 'shared/types/redux';
import { IOrderList } from 'shared/types/models';

export interface IReduxState {
  communication: {
    myOrdersLoading: ICommunication;
    allOrdersLoading: ICommunication;
  };
  data: {
    myOrders: IOrderList;
    orders: IOrderList;
  };
}

export interface InjectOrderbookProps {
  orders: IOrderList;
  ordersLoading: ICommunication;
  loadMore(): void;
}

export type ILoadMyOrders = IAction<'ORDERBOOK:LOAD_MY_ORDERS', { page?: number; perPage?: number }>;
export type ILoadMyOrdersSuccess = IAction<'ORDERBOOK:LOAD_MY_ORDERS_SUCCESS', IOrderList>;
export type ILoadMyOrdersFail = IPlainFailAction<'ORDERBOOK:LOAD_MY_ORDERS_FAIL'>;

export type ILoadOrders = IAction<'ORDERBOOK:LOAD_ORDERS', { page?: number; perPage?: number }>;
export type ILoadOrdersSuccess = IAction<'ORDERBOOK:LOAD_ORDERS_SUCCESS', IOrderList>;
export type ILoadOrdersFail = IPlainFailAction<'ORDERBOOK:LOAD_ORDERS_FAIL'>;

export type Action =
  | ILoadOrders | ILoadOrdersSuccess | ILoadOrdersFail | ILoadMyOrders | ILoadMyOrdersSuccess | ILoadMyOrdersFail;
