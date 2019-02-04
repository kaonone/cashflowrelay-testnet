import { combineReducers } from 'redux';
import { makeCommunicationReducer } from 'redux-make-communication';
import { ReducersMap } from 'shared/types/redux';

import * as NS from '../../namespace';
import { initial } from '../initial';

export const communicationReducer = combineReducers<NS.IReduxState['communication']>({
  selling: makeCommunicationReducer<NS.ISell, NS.ISellSuccess, NS.ISellFail>(
    'SELL_CASH_FLOW:SELL', 'SELL_CASH_FLOW:SELL_SUCCESS', 'SELL_CASH_FLOW:SELL_FAIL',
    initial.communication.selling,
  ),
} as ReducersMap<NS.IReduxState['communication']>);
