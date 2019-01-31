import { IToken } from 'shared/types/models';
// tslint:disable:max-line-length
export const mockCashFlow: IToken = {
  id: 0,
  status: 'pending',
  name: 'Money for programming course',
  payerRating: 100,
  number: 423,
  payer: '0x9b9977d825bdb0db5e1e31e897d3839a6aeaa5a6',
  lender: '0x9b9977d825bdb0db5e1e31e897d3839a6aeaa5a6',
  instalments: { paid: 14, due: 3, missed: 7 },
  nextInstalmentDate: '12 February 2019',
  instalmentSize: 20,
  firstInstalmentDate: '12 February 2019',
  lastInstalmentDate: '12 February 2019',
  dueAmount: 30,
  balance: 20,
  discount: 18,
  totalInstalment: 1800,
  duration: 7,
  repayingAmount: 2178,
};

const token1: IToken = { ...mockCashFlow, id: 1, discount: 10 };
const token2: IToken = { ...mockCashFlow, id: 2, name: 'Money for tuition fees', discount: 7.5, rating: 3, status: 'saving' };
const token3: IToken = { ...mockCashFlow, id: 3, name: 'Quick n Easy money', discount: 30, rating: 1, status: 'awaiting' };
const token4: IToken = { ...mockCashFlow, id: 4, name: 'Money for wedding', discount: 5, rating: 5, payerRating: 15, status: 'sold' };

const token5: IToken = { ...mockCashFlow, id: 5, rating: 3, price: 1200 };
const token6: IToken = { ...mockCashFlow, id: 6, rating: 1, price: 970 };

export const obligationsMock: IToken[] = [token1, token2, token3, token4];

export const incomingMock: IToken[] = [token5, token6];
