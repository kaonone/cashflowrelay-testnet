import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: buy, completed: buySuccess, failed: buyFail } =
  makeCommunicationActionCreators<NS.IBuy, NS.IBuySuccess, NS.IBuyFail>(
    'BUY_CASH_FLOW:BUY', 'BUY_CASH_FLOW:BUY_SUCCESS', 'BUY_CASH_FLOW:BUY_FAIL',
  );
