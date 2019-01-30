export type Instalments = Record<'paid' | 'due' | 'missed', number>;

export interface IToken {
  id: number;
  status: ITokenStatus;
  number: number;
  name: string;
  payer: string;
  lender: string;
  rating?: number;
  payerRating: number;
  firstInstalmentDate: string;
  lastInstalmentDate: string;
  nextInstalmentDate: string;
  instalmentSize: number;
  instalments: Instalments;
  totalInstalment: number;
  dueAmount: number;
  balance: number;
  discount: number;
  price?: number;
}

export type TokenType = 'incoming' | 'obligations' | 'selling';

export type ITokenStatus = 'pending' | 'saving' | 'awaiting' | 'sold';
