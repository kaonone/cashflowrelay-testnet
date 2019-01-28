import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.transactions;
}

export function selectSentTransactions(state: IAppReduxState): NS.ITransactionInfo[] {
  return selectState(state).data.sentTransactions;
}
