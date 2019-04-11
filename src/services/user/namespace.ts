import { IAction, IPlainAction, IPlainFailAction, ICommunication } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    checkingIsUserSigned: ICommunication;
    checkingPermissions: ICommunication,
    settingMinter: ICommunication,
    settingApproved: ICommunication,
    settingPayingAllowance: ICommunication,
    settingStakingAllowance: ICommunication,
    settingBuyingAllowance: ICommunication,
  };
  data: {
    confirmedAddress: string | null;
    isLogged: boolean;
    isCheckedAuth: boolean;
    isCheckedPermissions: boolean;
    isMinter: boolean;
    isApproved: boolean;
    isPayingAllowance: boolean;
    isStakingAllowance: boolean;
    isBuyingAllowance: boolean;
  };
}

interface IPermissions {
  isMinter: boolean;
  isApproved: boolean;
  isPayingAllowance: boolean;
  isStakingAllowance: boolean;
  isBuyingAllowance: boolean;
}

export type ICompleteAuthentication = IAction<'USER:COMPLETE_AUTHENTICATION', { address: string }>;

export type ICheckIsUserSigned = IPlainAction<'USER:CHECK_IS_USER_SIGNED'>;
export type ICheckIsUserSignedSuccess = IPlainAction<'USER:CHECK_IS_USER_SIGNED_SUCCESS'>;
export type ICheckIsUserSignedFail = IPlainFailAction<'USER:CHECK_IS_USER_SIGNED_FAIL'>;

export type ILogout = IPlainAction<'USER:LOGOUT'>;

export type ICheckPermissions = IPlainAction<'USER:CHECK_PERMISSIONS'>;
export type ICheckPermissionsSuccess = IAction<'USER:CHECK_PERMISSIONS_SUCCESS', IPermissions>;
export type ICheckPermissionsFail = IPlainFailAction<'USER:CHECK_PERMISSIONS_FAIL'>;

export type ISetMinter = IPlainAction<'USER:SET_MINTER'>;
export type ISetMinterSuccess = IPlainAction<'USER:SET_MINTER_SUCCESS'>;
export type ISetMinterFail = IPlainFailAction<'USER:SET_MINTER_FAIL'>;

export type ISetApproved = IAction<'USER:SET_APPROVED', { isApproved: boolean }>;
export type ISetApprovedSuccess = IAction<'USER:SET_APPROVED_SUCCESS', { isApproved: boolean }>;
export type ISetApprovedFail = IPlainFailAction<'USER:SET_APPROVED_FAIL'>;

export type ISetPayingAllowance = IAction<'USER:SET_PAYING_ALLOWANCE', { isPayingAllowance: boolean }>;
export type ISetPayingAllowanceSuccess = IAction<'USER:SET_PAYING_ALLOWANCE_SUCCESS', { isPayingAllowance: boolean }>;
export type ISetPayingAllowanceFail = IPlainFailAction<'USER:SET_PAYING_ALLOWANCE_FAIL'>;

export type ISetBuyingAllowance = IAction<'USER:SET_BUYING_ALLOWANCE', { isBuyingAllowance: boolean }>;
export type ISetBuyingAllowanceSuccess = IAction<'USER:SET_BUYING_ALLOWANCE_SUCCESS', { isBuyingAllowance: boolean }>;
export type ISetBuyingAllowanceFail = IPlainFailAction<'USER:SET_BUYING_ALLOWANCE_FAIL'>;

export type ISetStakingAllowance = IAction<'USER:SET_STAKING_ALLOWANCE', { isStakingAllowance: boolean }>;
export type ISetStakingAllowanceSuccess = IAction<
  'USER:SET_STAKING_ALLOWANCE_SUCCESS',
  { isStakingAllowance: boolean }
>;
export type ISetStakingAllowanceFail = IPlainFailAction<'USER:SET_STAKING_ALLOWANCE_FAIL'>;

export type Action =
  ICompleteAuthentication |
  ICheckIsUserSigned | ICheckIsUserSignedSuccess | ICheckIsUserSignedFail | ILogout
  | ICheckPermissions | ICheckPermissionsSuccess | ICheckPermissionsFail
  | ISetMinter | ISetMinterSuccess | ISetMinterFail
  | ISetApproved | ISetApprovedSuccess | ISetApprovedFail
  | ISetPayingAllowance | ISetPayingAllowanceSuccess | ISetPayingAllowanceFail
  | ISetBuyingAllowance | ISetBuyingAllowanceSuccess | ISetBuyingAllowanceFail
  | ISetStakingAllowance | ISetStakingAllowanceSuccess | ISetStakingAllowanceFail;
