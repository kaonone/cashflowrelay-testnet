import { IAppReduxState } from 'shared/types/app';
import { makeCommunicationSelector } from 'shared/helpers/redux';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.user;
}

export function selectConfirmedAddress(state: IAppReduxState): string | null {
  return selectState(state).data.confirmedAddress;
}

export function selectIsLogged(state: IAppReduxState): boolean {
  return selectState(state).data.isLogged;
}

export function selectIsChecked(state: IAppReduxState): boolean {
  return selectState(state).data.isChecked;
}

export const selectCommunication = makeCommunicationSelector(selectState);
