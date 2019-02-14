import { SignedOrder, BigNumber } from '0x.js';
import { PaginatedCollection } from '@0x/types';

export type Instalments = Record<'paid' | 'due' | 'missed', number>;

export interface IToken {
  // from contract
  amount: BigNumber;
  balance: BigNumber;
  createdAt: number; // in milliseconds
  duration: number; // in milliseconds
  id: string;
  instalmentSize: BigNumber;
  interestRate: number; // in percent
  lastPaymentDate: number; // in milliseconds
  name: string;
  payer: string;

  // contract derivative
  isCreatedByMe: boolean;
  periodDuration: number; // in millisecond
  firstInstalmentDate: number; // in milliseconds
  lastInstalmentDate: number; // in milliseconds
  instalmentCount: number;
}

export interface IBlockChainToken {
  balance: string; // c2fc balance
  commit: string; // installment size
  created: string; // in seconds
  duration: string; // in seconds
  interestRate: string;
  lastPayment: string; // in seconds
  name: string; // token name
  publisher: string; // payer address
  value: string; // full repayment amount
}

export type TokenType = 'incoming' | 'obligations' | 'selling';

export type TokenStatus = 'pending' | 'saving' | 'awaitingBuyer' | 'sold' | 'completed';

export type IOrder = SignedOrder & {
  price: BigNumber;
  tokenId: BigNumber;
};

export type IOrderList = PaginatedCollection<IOrder>;

export interface IInstallments {
  paid: IPaymentOrder[];
  due: IPaymentOrder[];
  missed: IPaymentOrder[];
}

export interface IPaymentOrder {
  id: number;
  subscriber: string;
  pendingDatePayment: number; // in milliseconds
  datePayment: number; // in milliseconds
  amount: BigNumber;
  isPayed: boolean;
  isDeleted: boolean;
}

export interface IBlockChainPaymentOrder {
  subscriber: string;
  pendingDatePayment: string;
  datePayment: string;
  amount: string;
  isPayed: boolean;
  isDeleted: boolean;
}
