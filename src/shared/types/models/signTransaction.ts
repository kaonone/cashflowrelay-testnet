import { SubsetMapStrict } from '_helpers';

export interface ITransaction {
  txid: string;
}

export type TransactionType = 'addMinter' | 'createToken';
export type TransactionDataByType = SubsetMapStrict<Record<TransactionType, any>, {
  addMinter: null;
  createToken: {
    tokenId: number;
    // loanAmount: number;
    // interest: number;
    // instalmentSize: number;
    // periodicity: number;
  };
}>;

export type TransactionRequest = {
  [key in TransactionType]: {
    type: key;
    data: TransactionDataByType[key];
  };
}[TransactionType];
