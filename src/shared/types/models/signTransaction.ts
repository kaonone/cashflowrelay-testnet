import { SubsetMapStrict } from '_helpers';
import { TimePeriod, ID } from './common';

export interface ITransaction {
  txid: string;
}

export type TransactionType = 'getInFund' | 'depositToFund';
export type ABIRequestDataByType = SubsetMapStrict<Record<TransactionType, any>, {
  getInFund: {
    fundId: ID;
    regularPayment: number;
    periodicity: TimePeriod;
    retirementDate: number;
    wallet: string;
  };
  depositToFund: {
    fundId: ID;
  };
}>;

export type ABIRequest = {
  [key in TransactionType]: {
    uuid: string;
    type: key;
    data: ABIRequestDataByType[key];
  };
}[TransactionType];
