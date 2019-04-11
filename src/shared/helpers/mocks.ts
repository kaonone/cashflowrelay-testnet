import { BigNumber } from '0x.js';
import { IToken } from 'shared/types/models';

// tslint:disable:max-line-length
export const mockCashFlow: IToken = {
  id: '0',
  name: 'Money for programming course',
  payer: '0x9b9977d825bdb0db5e1e31e897d3839a6aeaa5a6',
  instalmentSize: new BigNumber(20),
  stakeSize: new BigNumber(200),
  firstInstalmentDate: new Date(2019, 2, 10).getTime(),
  lastInstalmentDate: new Date(2019, 4, 10).getTime(),
  balance: new BigNumber(20),
  interestRate: 18,
  amount: new BigNumber(1800),
  createdAt: new Date(2019, 1, 10).getTime(),
  duration: new Date(2019, 4, 10).getTime() - new Date(2019, 1, 10).getTime(),
  lastPaymentDate: new Date(2019, 2, 10).getTime(),
  isCreatedByMe: true,
  periodDuration: (new Date(2019, 4, 10).getTime() - new Date(2019, 1, 10).getTime()) / 3,
  instalmentCount: 3,
}
;

const token1: IToken = { ...mockCashFlow, id: '1' };
const token2: IToken = { ...mockCashFlow, id: '2', name: 'Money for tuition fees' };
const token3: IToken = { ...mockCashFlow, id: '3', name: 'Quick n Easy money' };
const token4: IToken = { ...mockCashFlow, id: '4', name: 'Money for wedding' };

const token5: IToken = { ...mockCashFlow, id: '5' };
const token6: IToken = { ...mockCashFlow, id: '6' };

export const obligationsMock: IToken[] = [token1, token2, token3, token4];

export const incomingMock: IToken[] = [token5, token6];
