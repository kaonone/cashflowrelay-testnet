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

export function selectIsCheckedAuth(state: IAppReduxState): boolean {
  return selectState(state).data.isCheckedAuth;
}

export function selectIsCheckedPermissions(state: IAppReduxState): boolean {
  return selectState(state).data.isCheckedPermissions;
}

export function selectIsMinter(state: IAppReduxState): boolean {
  return selectState(state).data.isMinter;
}

export function selectIsApproved(state: IAppReduxState): boolean {
  return selectState(state).data.isApproved;
}

export function selectIsPayingAllowance(state: IAppReduxState): boolean {
  return selectState(state).data.isPayingAllowance;
}

export function selectIsStakingAllowance(state: IAppReduxState): boolean {
  return selectState(state).data.isStakingAllowance;
}

export function selectIsBuyingAllowance(state: IAppReduxState): boolean {
  return selectState(state).data.isBuyingAllowance;
}

export function selectIsAllPermissionsGranted(state: IAppReduxState): boolean {
  const { isMinter, isPayingAllowance, isApproved, isBuyingAllowance, isStakingAllowance } = selectState(state).data;

  return isMinter && isPayingAllowance && isApproved && isBuyingAllowance && isStakingAllowance;
}

export const selectCommunication = makeCommunicationSelector(selectState);
