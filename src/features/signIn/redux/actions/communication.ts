import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'redux-make-communication';

export const { execute: signIn, completed: signInSuccess, failed: signInFail } =
  makeCommunicationActionCreators<NS.ISignIn, NS.ISignInSuccess, NS.ISignInFail>(
    'SIGN_IN:SIGN_IN', 'SIGN_IN:SIGN_IN_SUCCESS', 'SIGN_IN:SIGN_IN_FAIL',
  );
