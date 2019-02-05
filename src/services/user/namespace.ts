import { IAction, IPlainAction, IPlainFailAction, ICommunication } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    checkingIsUserSigned: ICommunication;
    checkingPermissions: ICommunication,
    settingMinter: ICommunication,
    settingApproved: ICommunication,
    settingAllowance: ICommunication,
  };
  data: {
    confirmedAddress: string | null;
    isLogged: boolean;
    isCheckedAuth: boolean;
    isCheckedPermissions: boolean;
    isMinter: boolean;
    isApproved: boolean;
    isAllowance: boolean;
  };
}

interface IPermissions {
  isMinter: boolean;
  isApproved: boolean;
  isAllowance: boolean;
}

export type ICompleteAuthentication = IAction<'USER:COMPLETE_AUTHENTICATION', { address: string }>;

export type ICheckIsUserSigned = IPlainAction<'USER:CHECK_IS_USER_SIGNED'>;
export type ICheckIsUserSignedSuccess = IPlainAction<'USER:CHECK_IS_USER_SIGNED_SUCCESS'>;
export type ICheckIsUserSignedFail = IPlainFailAction<'USER:CHECK_IS_USER_SIGNED_FAIL'>;

export type ILogout = IPlainAction<'USER:LOGOUT'>;

export type ICheckPermissions = IPlainAction<'USER:CHECK_PERMISSIONS'>;
export type ICheckPermissionsSuccess = IAction<'USER:CHECK_PERMISSIONS_SUCCESS', IPermissions>;
export type ICheckPermissionsFail = IPlainFailAction<'USER:CHECK_PERMISSIONS_FAIL'>;

export type ISetApproved = IAction<'USER:SET_APPROVED', { isApproved: boolean }>;
export type ISetApprovedSuccess = IAction<'USER:SET_APPROVED_SUCCESS', { isApproved: boolean }>;
export type ISetApprovedFail = IPlainFailAction<'USER:SET_APPROVED_FAIL'>;

export type ISetAllowance = IAction<'USER:SET_ALLOWANCE', { isAllowance: boolean }>;
export type ISetAllowanceSuccess = IAction<'USER:SET_ALLOWANCE_SUCCESS', { isAllowance: boolean }>;
export type ISetAllowanceFail = IPlainFailAction<'USER:SET_ALLOWANCE_FAIL'>;

export type ISetMinter = IPlainAction<'USER:SET_MINTER'>;
export type ISetMinterSuccess = IPlainAction<'USER:SET_MINTER_SUCCESS'>;
export type ISetMinterFail = IPlainFailAction<'USER:SET_MINTER_FAIL'>;

export type Action =
  ICompleteAuthentication |
  ICheckIsUserSigned | ICheckIsUserSignedSuccess | ICheckIsUserSignedFail | ILogout
  | ICheckPermissions | ICheckPermissionsSuccess | ICheckPermissionsFail
  | ISetMinter | ISetMinterSuccess | ISetMinterFail
  | ISetApproved | ISetApprovedSuccess | ISetApprovedFail
  | ISetAllowance | ISetAllowanceSuccess | ISetAllowanceFail;
