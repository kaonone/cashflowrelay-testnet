import { IAction } from 'shared/types/redux';
import { SetTransactionRequest } from 'shared/types/models';

export interface IReduxState {
  data: {
    txHashMap: Record<string, string>;
  };
}

export interface ITransactionInfo {
  stackId: string;
  request: SetTransactionRequest;
}

export type IBindTxHash = IAction<'TRANSACTIONS:BIND_TH_HASH', { uuid: string, thHash: string }>;

export type ISendTransaction = IAction<
  'TRANSACTIONS:SEND_TRANSACTION', { request: SetTransactionRequest, uuid: string }
>;

export type Action =
  | ISendTransaction
  | IBindTxHash;
