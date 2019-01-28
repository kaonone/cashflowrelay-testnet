import { TransactionRequest } from 'shared/types/models';
import * as NS from '../../namespace';

export function sendTransaction(request: TransactionRequest): NS.ISendTransaction {
  return {
    type: 'TRANSACTIONS:SEND_TRANSACTION',
    payload: request,
  };
}

export * from './data';
