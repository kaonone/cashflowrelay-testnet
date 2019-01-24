import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import { ReducersMap } from 'shared/types/redux';
import { composeReducers, makeResetStateReducer } from 'shared/helpers/redux';

import * as NS from '../../namespace';
import { initial } from '../initial';

export const communicationReducer = composeReducers<NS.IReduxState['communication']>([
  combineReducers<NS.IReduxState['communication']>({
    abiGeneration: makeCommunicationReducer<NS.IGenerateABI, NS.IGenerateABISuccess, NS.IGenerateABIFail>(
      'SIGN_TRANSACTION:GENERATE_ABI', 'SIGN_TRANSACTION:GENERATE_ABI_SUCCESS', 'SIGN_TRANSACTION:GENERATE_ABI_FAIL',
      initial.communication.abiGeneration,
    ),
  } as ReducersMap<NS.IReduxState['communication']>),
  makeResetStateReducer<NS.ISignTransaction, NS.IReduxState['communication']>(
    'SIGN_TRANSACTION:SIGN_TRANSACTION', initial.communication,
  ),
]);
