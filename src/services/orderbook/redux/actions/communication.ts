import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: loadOrders, completed: loadOrdersSuccess, failed: loadOrdersFail } =
  makeCommunicationActionCreators<NS.ILoadOrders, NS.ILoadOrdersSuccess, NS.ILoadOrdersFail>(
    'ORDERBOOK:LOAD_ORDERS', 'ORDERBOOK:LOAD_ORDERS_SUCCESS', 'ORDERBOOK:LOAD_ORDERS_FAIL',
  );

export const { execute: loadMyOrders, completed: loadMyOrdersSuccess, failed: loadMyOrdersFail } =
  makeCommunicationActionCreators<NS.ILoadMyOrders, NS.ILoadMyOrdersSuccess, NS.ILoadMyOrdersFail>(
    'ORDERBOOK:LOAD_MY_ORDERS', 'ORDERBOOK:LOAD_MY_ORDERS_SUCCESS', 'ORDERBOOK:LOAD_MY_ORDERS_FAIL',
  );
