import { createSelector } from 'reselect';

import { IOrderList } from 'shared/types/models';
import { IAppReduxState } from 'shared/types/app';
import { makeCommunicationSelector } from 'shared/helpers/redux';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.orderbook;
}

export const selectCommunication = makeCommunicationSelector(selectState);

export function selectMyOrders(state: IAppReduxState) {
  return selectState(state).data.myOrders;
}

export const selectMyOrderByTokenId = createSelector(
  selectMyOrders,
  (_state: IAppReduxState, tokenId: string) => tokenId,
  (myOrders: IOrderList, tokenId: string) => {
    const order = myOrders.records.find(item => item.tokenId.toString() === tokenId);
    return order || null;
  },
);

export function selectOrders(state: IAppReduxState) {
  const orders = selectState(state).data.orders;
  const hideOrders = selectHideOrders(state);
  const filteredOrders = { ...orders, records: getFilteredOrders(orders.records, hideOrders) };
  return filteredOrders;
}

export function selectHideOrders(state: IAppReduxState) {
  return selectState(state).data.hideOrders;
}

function getFilteredOrders(orders: IOrderList['records'], hideOrders: NS.TokenId[]) {
  return orders.filter(order => !hideOrders.some(hideOrderId => order.tokenId.equals(hideOrderId)));
}
