import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';

import { ReducersMap } from 'shared/types/redux';

import * as NS from '../../namespace';
import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  buying: makeCommunicationReducer<NS.IBuy, NS.IBuySuccess, NS.IBuyFail>(
    'BUY_CASH_FLOW:BUY', 'BUY_CASH_FLOW:BUY_SUCCESS', 'BUY_CASH_FLOW:BUY_FAIL',
    initial.communication.buying,
  ),
} as ReducersMap<NS.IReduxState['communication']>);
