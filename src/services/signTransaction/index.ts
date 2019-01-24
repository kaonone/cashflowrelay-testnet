import * as namespace from './namespace';
import { actions, selectors, reducer, getSaga } from './redux';
import { IReduxEntry } from 'shared/types/app';

export { SignTransactionFunction } from './namespace';
export { namespace, selectors, actions };
export * from './view/containers';

export const reduxEntry: IReduxEntry = {
  reducers: { signTransaction: reducer },
  sagas: [getSaga],
};
