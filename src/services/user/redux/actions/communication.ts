import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'redux-make-communication';

export const { execute: checkIsUserSigned, completed: checkIsUserSignedSuccess, failed: checkIsUserSignedFail } =
  makeCommunicationActionCreators<NS.ICheckIsUserSigned, NS.ICheckIsUserSignedSuccess, NS.ICheckIsUserSignedFail>(
    'USER:CHECK_IS_USER_SIGNED', 'USER:CHECK_IS_USER_SIGNED_SUCCESS', 'USER:CHECK_IS_USER_SIGNED_FAIL',
  );

export const { execute: checkIsApproved, completed: checkIsApprovedSuccess, failed: checkIsApprovedFail } =
  makeCommunicationActionCreators<NS.ICheckApproved, NS.ICheckApprovedSuccess, NS.ICheckApprovedFail>(
    'USER:CHECK_APPROVED', 'USER:CHECK_APPROVED_SUCCESS', 'USER:CHECK_APPROVED_FAIL',
  );

export const { execute: setApproved, completed: setApprovedSuccess, failed: setApprovedFail } =
  makeCommunicationActionCreators<NS.ISetApproved, NS.ISetApprovedSuccess, NS.ISetApprovedFail>(
    'USER:SET_APPROVED', 'USER:SET_APPROVED_SUCCESS', 'USER:SET_APPROVED_FAIL',
  );
