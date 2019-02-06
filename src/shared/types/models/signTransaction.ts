import { SubsetMapStrict } from '_helpers';
import { BigNumber } from '0x.js';
import { IBlockChainToken, IToken, IBlockChainPaymentOrder, IPaymentOrder } from './cashFlow';

export interface ITransaction {
  txid: string;
}

export type SetTransactionType = 'addMinter' | 'createCashFlow' | 'executeOrder' | 'executePayment' | 'createOrder';
export type GetContractTransactionType = 'isMinter' | 'ownerOf' | 'idsOfCashflowsFor' | 'cashflowFor';
export type GetPaymentOrderTransactionType = 'getOrdersList' | 'getByOrderId';
export type TransactionType = SetTransactionType | GetContractTransactionType | GetPaymentOrderTransactionType;

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
  executeOrder: { tokenId: number, orderId: number };
  executePayment: { tokenId: number, tokenAmount: number };
  createOrder: { tokenId: number, tokenAmount: number };
  // get
  isMinter: { address?: string };
  ownerOf: { tokenId: number };
  idsOfCashflowsFor: { address?: string };
  cashflowFor: { tokenId: number };
  getOrdersList: { tokenIds: number };
  getByOrderId: { tokenId: number, orderId: number };
}>;

export type ContractTransactionResponseDataByType = SubsetMapStrict<Record<GetContractTransactionType, any>, {
  isMinter: boolean;
  ownerOf: string; // address
  idsOfCashflowsFor: string[];
  cashflowFor: IBlockChainToken;
}>;

export type ContractTransactionDataByType = SubsetMapStrict<Record<GetContractTransactionType, any>, {
  isMinter: boolean;
  ownerOf: string; // address
  idsOfCashflowsFor: number[];
  cashflowFor: IToken;
}>;

export type PaymentOrderTransactionResponseDataByType = SubsetMapStrict<Record<GetPaymentOrderTransactionType, any>, {
  getOrdersList: string[];
  getByOrderId: IBlockChainPaymentOrder;
}>;

export type PaymentOrderTransactionDataByType = SubsetMapStrict<Record<GetPaymentOrderTransactionType, any>, {
  getOrdersList: number[];
  getByOrderId: IPaymentOrder;
}>;

export type SetTransactionRequest = {
  [key in SetTransactionType]: {
    type: key;
    data: TransactionRequestDataByType[key];
  };
}[SetTransactionType];

export type GetTransactionRequest = {
  [key in GetContractTransactionType]: {
    type: key;
    data: TransactionRequestDataByType[key];
  };
}[GetContractTransactionType];
