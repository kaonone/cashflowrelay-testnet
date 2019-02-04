import { IAction, IPlainAction, IPlainFailAction, ICommunication } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    checkingIsUserSigned: ICommunication;
    checkingApproved: ICommunication,
    settingApproved: ICommunication,
    checkingAllowance: ICommunication,
    settingAllowance: ICommunication,
  };
  data: {
    confirmedAddress: string | null;
    isLogged: boolean;
    isChecked: boolean;
    isApproved: boolean;
  };
}

export type ICompleteAuthentication = IAction<'USER:COMPLETE_AUTHENTICATION', { address: string }>;

export type ICheckIsUserSigned = IPlainAction<'USER:CHECK_IS_USER_SIGNED'>;
export type ICheckIsUserSignedSuccess = IPlainAction<'USER:CHECK_IS_USER_SIGNED_SUCCESS'>;
export type ICheckIsUserSignedFail = IPlainFailAction<'USER:CHECK_IS_USER_SIGNED_FAIL'>;

export type ILogout = IPlainAction<'USER:LOGOUT'>;

export type ICheckISMinter = IPlainAction<'USER:CHECK_IS_MINTER'>;

export type ICheckApproved = IPlainAction<'USER:CHECK_APPROVED'>;
export type ICheckApprovedSuccess = IAction<'USER:CHECK_APPROVED_SUCCESS', { isApproved: boolean }>;
export type ICheckApprovedFail = IPlainFailAction<'USER:CHECK_APPROVED_FAIL'>;




export type ICheckAllowance = IPlainAction<'USER:CHECK_ALLOWANCE'>;
export type ICheckAllowanceSuccess = IAction<'USER:CHECK_ALLOWANCE_SUCCESS', { isAllowance: boolean }>;
export type ICheckAllowanceFail = IPlainFailAction<'USER:CHECK_ALLOWANCE_FAIL'>;



export type ISetApproved = IAction<'USER:SET_APPROVED', { isApproved: boolean }>;
export type ISetApprovedSuccess = IAction<'USER:SET_APPROVED_SUCCESS', { isApproved: boolean }>;
export type ISetApprovedFail = IPlainFailAction<'USER:SET_APPROVED_FAIL'>;

export type ISetAllowance = IAction<'USER:SET_ALLOWANCE', { isAllowed: boolean }>;
export type ISetAllowanceSuccess = IAction<'USER:SET_APPROVED_SUCCESS', { isApproved: boolean }>;
export type ISetAllowanceFail = IPlainFailAction<'USER:SET_APPROVED_FAIL'>;



export type Action =
  ICompleteAuthentication |
  ICheckIsUserSigned | ICheckIsUserSignedSuccess | ICheckIsUserSignedFail | ILogout
  | ICheckISMinter | ISetAllowance
  | ICheckApproved | ICheckApprovedSuccess | ICheckApprovedFail
  | ISetApproved | ISetApprovedSuccess | ISetApprovedFail
  | ICheckAllowance | ICheckAllowanceSuccess | ICheckAllowanceFail;
