import * as namespace from './namespace';
import { actions, getSaga, reducer } from './redux';
import { IReduxEntry } from 'shared/types/app';

export { namespace, actions };
export * from './view/containers';

export const reduxEntry: IReduxEntry = {
  reducers: { transactions: reducer },
  sagas: [getSaga],
};
