import * as NS from '../../namespace';

export function pushTransactionInfo(info: NS.ITransactionInfo): NS.IPushTransactionInfo {
  return {
    type: 'TRANSACTIONS:PUSH_TRANSACTION_INFO',
    payload: info,
  };
}

export function deleteTransactionInfo(stackId: string): NS.IDeleteTransactionInfo {
  return {
    type: 'TRANSACTIONS:DELETE_TRANSACTION_INFO',
    payload: { stackId },
  };
}
