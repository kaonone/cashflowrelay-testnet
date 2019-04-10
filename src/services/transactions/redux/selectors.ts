import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.transactions;
}

export function selectTxHashMap(state: IAppReduxState) {
  return selectState(state).data.txHashMap;
}
