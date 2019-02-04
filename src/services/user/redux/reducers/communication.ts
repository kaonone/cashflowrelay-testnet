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
  checkingApproved:
    makeCommunicationReducer<NS.ICheckApproved, NS.ICheckApprovedSuccess, NS.ICheckApprovedFail>(
      'USER:CHECK_APPROVED', 'USER:CHECK_APPROVED_SUCCESS', 'USER:CHECK_APPROVED_FAIL',
      initial.communication.checkingApproved,
    ),
  settingApproved:
    makeCommunicationReducer<NS.ISetApproved, NS.ISetApprovedSuccess, NS.ISetApprovedFail>(
      'USER:SET_APPROVED', 'USER:SET_APPROVED_SUCCESS', 'USER:SET_APPROVED_FAIL',
      initial.communication.settingApproved,
    ),
  checkingAllowance:
    makeCommunicationReducer<NS.ICheckAllowance, NS.ICheckAllowanceSuccess, NS.ICheckAllowanceFail>(
      'USER:CHECK_ALLOWANCE', 'USER:CHECK_ALLOWANCE_SUCCESS', 'USER:CHECK_ALLOWANCE_FAIL',
      initial.communication.checkingAllowance,
    ),
  settingAllowance:
    makeCommunicationReducer<NS.ICheckAllowance, NS.ICheckAllowanceSuccess, NS.ICheckAllowanceFail>(
      'USER:CHECK_ALLOWANCE', 'USER:CHECK_ALLOWANCE_SUCCESS', 'USER:CHECK_ALLOWANCE_FAIL',
      initial.communication.settingAllowance,
    ),
} as ReducersMap<NS.IReduxState['communication']>);
