import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import * as NS from '../../namespace';
import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  listLoading: makeCommunicationReducer<NS.ILoadList, NS.ILoadListSuccess, NS.ILoadListFail>(
    'DATA_PROVIDER:LOAD_LIST', 'DATA_PROVIDER:LOAD_LIST_SUCCESS', 'DATA_PROVIDER:LOAD_LIST_FAIL',
    initial.communication.listLoading,
  ),
});
