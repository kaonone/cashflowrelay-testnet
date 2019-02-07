import * as makeUuid from 'uuid';
import { SetTransactionRequest } from 'shared/types/models';
import * as NS from '../../namespace';

export function sendTransaction(request: SetTransactionRequest, uuid: string = makeUuid()): NS.ISendTransaction {
  return {
    type: 'TRANSACTIONS:SEND_TRANSACTION',
    payload: { request, uuid },
  };
}

export function bindTxHash(uuid: string, thHash: string): NS.IBindTxHash {
  return {
    type: 'TRANSACTIONS:BIND_TH_HASH',
    payload: { uuid, thHash },
  };
}
