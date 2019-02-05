import { IAction } from 'shared/types/redux';
import { SetTransactionRequest } from 'shared/types/models';

export interface IReduxState {
  data: {};
}

export interface ITransactionInfo {
  stackId: string;
  request: SetTransactionRequest;
}

export type IDeleteTransactionInfo = IAction<'TRANSACTIONS:DELETE_TRANSACTION_INFO', { stackId: string }>;

export type IPushTransactionInfo = IAction<'TRANSACTIONS:PUSH_TRANSACTION_INFO', ITransactionInfo>;

export type ISendTransaction = IAction<'TRANSACTIONS:SEND_TRANSACTION', SetTransactionRequest>;

export type Action =
  | ISendTransaction
  | IPushTransactionInfo
  | IDeleteTransactionInfo;
