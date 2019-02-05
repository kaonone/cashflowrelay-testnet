import * as namespace from './namespace';
import { actions, selectors, reducer, getSaga } from './redux';
import { IReduxEntry } from 'shared/types/app';

export { namespace, selectors, actions };
export { InjectOrderbookProps } from './namespace';
export * from './view/containers';

export const reduxEntry: IReduxEntry = {
  reducers: { orderbook: reducer },
  sagas: [getSaga],
};