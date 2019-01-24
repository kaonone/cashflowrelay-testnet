import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  signing: makeCommunicationReducer<NS.ISignIn, NS.ISignInSuccess, NS.ISignInFail>(
    'SIGN_IN:SIGN_IN', 'SIGN_IN:SIGN_IN_SUCCESS', 'SIGN_IN:SIGN_IN_FAIL',
    initial.communication.signing,
  ),
} as ReducersMap<NS.IReduxState['communication']>);
