import * as namespace from './namespace';
import { actions, getSaga } from './redux';
import { IReduxEntry } from 'shared/types/app';

export { namespace, actions };
export * from './view/containers';

export const reduxEntry: IReduxEntry = {
  sagas: [getSaga],
};
