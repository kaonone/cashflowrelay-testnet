import { SubsetMapStrict } from '_helpers';
import BigNumber from 'bignumber.js';

export interface ITransaction {
  txid: string;
}

export type SetTransactionType = 'addMinter' | 'createCashFlow';
export type GetTransactionType = 'isMinter' | 'ownerOf' | 'idsOfCashflowsFor' | 'cashflowFor';
export type TransactionType = SetTransactionType | GetTransactionType;

export type TransactionRequestDataByType = SubsetMapStrict<Record<TransactionType, any>, {
  // set
  addMinter: null;
  createCashFlow: {
    name: string;
    value: BigNumber; // full repayment amount
    commit: BigNumber; // installment size
    interestRate: number;
    duration: number; // in seconds
  };
  // get
  isMinter: { address?: string };
  ownerOf: { tokenId: number };
  idsOfCashflowsFor: { address?: string };
  cashflowFor: { tokenId: number };
}>;

export type SetTransactionRequest = {
  [key in SetTransactionType]: {
    type: key;
    data: TransactionRequestDataByType[key];
  };
}[SetTransactionType];

export type GetTransactionRequest = {
  [key in GetTransactionType]: {
    type: key;
    data: TransactionRequestDataByType[key];
  };
}[GetTransactionType];
