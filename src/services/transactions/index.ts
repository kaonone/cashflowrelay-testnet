import * as namespace from './namespace';
import { actions, getSaga, reducer } from './redux';
import { IReduxEntry } from 'shared/types/app';

export { namespace, actions };
export * from './view/containers';
export { default as useMainContractData } from './hooks/useMainContractData';
export { default as usePaymentOrders } from './hooks/usePaymentOrders';

export const reduxEntry: IReduxEntry = {
  reducers: { transactions: reducer },
  sagas: [getSaga],
};
