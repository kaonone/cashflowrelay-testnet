import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'redux-make-communication';

export const { execute: checkIsUserSigned, completed: checkIsUserSignedSuccess, failed: checkIsUserSignedFail } =
  makeCommunicationActionCreators<NS.ICheckIsUserSigned, NS.ICheckIsUserSignedSuccess, NS.ICheckIsUserSignedFail>(
    'USER:CHECK_IS_USER_SIGNED', 'USER:CHECK_IS_USER_SIGNED_SUCCESS', 'USER:CHECK_IS_USER_SIGNED_FAIL',
  );
