import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  allOrdersLoading: makeCommunicationReducer<NS.ILoadOrders, NS.ILoadOrdersSuccess, NS.ILoadOrdersFail>(
    'ORDERBOOK:LOAD_ORDERS', 'ORDERBOOK:LOAD_ORDERS_SUCCESS', 'ORDERBOOK:LOAD_ORDERS_FAIL',
    initial.communication.allOrdersLoading,
  ),
  myOrdersLoading: makeCommunicationReducer<NS.ILoadMyOrders, NS.ILoadMyOrdersSuccess, NS.ILoadMyOrdersFail>(
    'ORDERBOOK:LOAD_MY_ORDERS', 'ORDERBOOK:LOAD_MY_ORDERS_SUCCESS', 'ORDERBOOK:LOAD_MY_ORDERS_FAIL',
    initial.communication.myOrdersLoading,
  ),
} as ReducersMap<NS.IReduxState['communication']>);
