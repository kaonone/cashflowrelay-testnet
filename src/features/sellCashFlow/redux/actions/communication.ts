import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: sell, completed: sellSuccess, failed: sellFail } =
  makeCommunicationActionCreators<NS.ISell, NS.ISellSuccess, NS.ISellFail>(
    'SELL_CASH_FLOW:SELL', 'SELL_CASH_FLOW:SELL_SUCCESS', 'SELL_CASH_FLOW:SELL_FAIL',
  );
