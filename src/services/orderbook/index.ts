import * as namespace from './namespace';
import { actions, selectors, reducer, getSaga } from './redux';
import { IReduxEntry } from 'shared/types/app';

export { namespace, selectors, actions };
export { InjectOrderbookProps } from './namespace';
export { default as useOrderbook } from './hooks/useOrderbook';
export { default as useMyOrder } from './hooks/useMyOrder';

export const reduxEntry: IReduxEntry = {
  reducers: { orderbook: reducer },
  sagas: [getSaga],
};
