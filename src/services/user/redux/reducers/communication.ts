import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  checkingIsUserSigned:
    makeCommunicationReducer<NS.ICheckIsUserSigned, NS.ICheckIsUserSignedSuccess, NS.ICheckIsUserSignedFail>(
      'USER:CHECK_IS_USER_SIGNED', 'USER:CHECK_IS_USER_SIGNED_SUCCESS', 'USER:CHECK_IS_USER_SIGNED_FAIL',
      initial.communication.checkingIsUserSigned,
    ),
  checkingPermissions:
    makeCommunicationReducer<NS.ICheckPermissions, NS.ICheckPermissionsSuccess, NS.ICheckPermissionsFail>(
      'USER:CHECK_PERMISSIONS', 'USER:CHECK_PERMISSIONS_SUCCESS', 'USER:CHECK_PERMISSIONS_FAIL',
      initial.communication.checkingPermissions,
    ),
  settingMinter:
    makeCommunicationReducer<NS.ISetMinter, NS.ISetMinterSuccess, NS.ISetMinterFail>(
      'USER:SET_MINTER', 'USER:SET_MINTER_SUCCESS', 'USER:SET_MINTER_FAIL',
      initial.communication.settingPayingAllowance,
    ),
  settingApproved:
    makeCommunicationReducer<NS.ISetApproved, NS.ISetApprovedSuccess, NS.ISetApprovedFail>(
      'USER:SET_APPROVED', 'USER:SET_APPROVED_SUCCESS', 'USER:SET_APPROVED_FAIL',
      initial.communication.settingApproved,
    ),
  settingPayingAllowance:
    makeCommunicationReducer<NS.ISetPayingAllowance, NS.ISetPayingAllowanceSuccess, NS.ISetPayingAllowanceFail>(
      'USER:SET_PAYING_ALLOWANCE', 'USER:SET_PAYING_ALLOWANCE_SUCCESS', 'USER:SET_PAYING_ALLOWANCE_FAIL',
      initial.communication.settingPayingAllowance,
    ),
  settingBuyingAllowance:
    makeCommunicationReducer<NS.ISetBuyingAllowance, NS.ISetBuyingAllowanceSuccess, NS.ISetBuyingAllowanceFail>(
      'USER:SET_BUYING_ALLOWANCE', 'USER:SET_BUYING_ALLOWANCE_SUCCESS', 'USER:SET_BUYING_ALLOWANCE_FAIL',
      initial.communication.settingBuyingAllowance,
    ),
} as ReducersMap<NS.IReduxState['communication']>);
