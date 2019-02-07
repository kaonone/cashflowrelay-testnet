import { IReduxEntry } from 'shared/types/app';
import * as namespace from './namespace';
import { actions, selectors, reducer, getSaga } from './redux';

export * from './containers';
export { namespace, selectors, actions };

export const reduxEntry: IReduxEntry = {
  reducers: { user: reducer },
  sagas: [getSaga],
};
