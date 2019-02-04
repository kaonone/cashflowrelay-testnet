import BigNumber from 'bignumber.js';

export type Instalments = Record<'paid' | 'due' | 'missed', number>;

export interface IToken {
  // from contract
  amount: BigNumber;
  balance: BigNumber;
  createdAt: number; // in milliseconds
  duration: number; // in milliseconds
  id: number;
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

export type ITokenStatus = 'pending' | 'saving' | 'awaiting' | 'sold';
