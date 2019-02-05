import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'redux-make-communication';

export const { execute: checkIsUserSigned, completed: checkIsUserSignedSuccess, failed: checkIsUserSignedFail } =
  makeCommunicationActionCreators<NS.ICheckIsUserSigned, NS.ICheckIsUserSignedSuccess, NS.ICheckIsUserSignedFail>(
    'USER:CHECK_IS_USER_SIGNED', 'USER:CHECK_IS_USER_SIGNED_SUCCESS', 'USER:CHECK_IS_USER_SIGNED_FAIL',
  );

export const { execute: checkPermissions, completed: checkPermissionsSuccess, failed: checkPermissionsFail } =
  makeCommunicationActionCreators<NS.ICheckPermissions, NS.ICheckPermissionsSuccess, NS.ICheckPermissionsFail>(
    'USER:CHECK_PERMISSIONS', 'USER:CHECK_PERMISSIONS_SUCCESS', 'USER:CHECK_PERMISSIONS_FAIL',
  );

export const { execute: setApproved, completed: setApprovedSuccess, failed: setApprovedFail } =
  makeCommunicationActionCreators<NS.ISetApproved, NS.ISetApprovedSuccess, NS.ISetApprovedFail>(
    'USER:SET_APPROVED', 'USER:SET_APPROVED_SUCCESS', 'USER:SET_APPROVED_FAIL',
  );

export const { execute: setAllowance, completed: setAllowanceSuccess, failed: setAllowanceFail } =
  makeCommunicationActionCreators<NS.ISetAllowance, NS.ISetAllowanceSuccess, NS.ISetAllowanceFail>(
    'USER:SET_ALLOWANCE', 'USER:SET_ALLOWANCE_SUCCESS', 'USER:SET_ALLOWANCE_FAIL',
  );

export const { execute: setMinter, completed: setMinterSuccess, failed: setMinterFail } =
  makeCommunicationActionCreators<NS.ISetMinter, NS.ISetMinterSuccess, NS.ISetMinterFail>(
    'USER:SET_MINTER', 'USER:SET_MINTER_SUCCESS', 'USER:SET_MINTER_FAIL',
  );
