import { IAppReduxState } from 'shared/types/app';
import { makeCommunicationSelector } from 'shared/helpers/redux';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.sellCashFlow;
}

export const selectCommunication = makeCommunicationSelector(selectState);
