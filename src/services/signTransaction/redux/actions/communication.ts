import { makeCommunicationActionCreators } from 'redux-make-communication';
import * as NS from '../../namespace';

export const { execute: generateABI, completed: generateABISuccess, failed: generateABIFail } =
  makeCommunicationActionCreators<NS.IGenerateABI, NS.IGenerateABISuccess, NS.IGenerateABIFail>(
    'SIGN_TRANSACTION:GENERATE_ABI', 'SIGN_TRANSACTION:GENERATE_ABI_SUCCESS', 'SIGN_TRANSACTION:GENERATE_ABI_FAIL',
  );

export function stopTransactionListening(): NS.IStopTransactionListening {
  return {
    type: 'SIGN_TRANSACTION:STOP_TRANSACTION_LISTENING',
  };
}
