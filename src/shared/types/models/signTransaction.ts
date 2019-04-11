import { SubsetMapStrict } from '_helpers';
import { BigNumber } from '0x.js';
import { IBlockChainToken, IToken, IBlockChainPaymentOrder, IPaymentOrder } from './cashFlow';

export interface ITransaction {
  txid: string;
}

export type SetTransactionType =
  | 'addMinter' | 'createCashFlow' | 'executeOrder' | 'executePayment' | 'createOrder'
  | 'withdrawPayments' | 'withdrawStake';
export type GetContractTransactionType =
  'isMinter' | 'ownerOf' | 'idsOfCashflowsFor' | 'cashflowFor' | 'idsOfSubscribedCashflowsFor';
export type GetPaymentOrderTransactionType = 'getOrdersList' | 'getByOrderId';
export type TransactionType = SetTransactionType | GetContractTransactionType | GetPaymentOrderTransactionType;

export type TransactionRequestDataByType = SubsetMapStrict<Record<TransactionType, any>, {
  // set
  addMinter: null;
  createCashFlow: {
    name: string;
    value: BigNumber; // full repayment amount
    stake: BigNumber; // stake size
    commit: BigNumber; // installment size
    interestRate: number;
    duration: number; // in seconds
  };
  executeOrder: { tokenId: string, orderId: number };
  executePayment: { tokenId: string, amount: BigNumber };
  createOrder: { tokenId: string, amount: BigNumber };
  withdrawPayments: { tokenId: string, amount: BigNumber };
  withdrawStake: { tokenId: string };
  // get
  isMinter: { address?: string };
  ownerOf: { tokenId: string };
  idsOfCashflowsFor: { address?: string };
  idsOfSubscribedCashflowsFor: { address?: string };
  cashflowFor: { tokenId: string };
  // get payment order
  getOrdersList: { tokenIds: number };
  getByOrderId: { tokenId: string, orderId: number };
}>;

export type ContractTransactionResponseDataByType = SubsetMapStrict<Record<GetContractTransactionType, any>, {
  isMinter: boolean;
  ownerOf: string; // address
  idsOfCashflowsFor: string[];
  idsOfSubscribedCashflowsFor: string[];
  cashflowFor: IBlockChainToken;
}>;

export type ContractTransactionDataByType = SubsetMapStrict<Record<GetContractTransactionType, any>, {
  isMinter: boolean;
  ownerOf: string; // address
  idsOfCashflowsFor: string[];
  idsOfSubscribedCashflowsFor: string[];
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
