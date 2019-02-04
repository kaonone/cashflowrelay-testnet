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

export function selectOrders(state: IAppReduxState) {
  return selectState(state).data.orders;
}
