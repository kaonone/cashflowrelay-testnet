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
} as ReducersMap<NS.IReduxState['communication']>);
