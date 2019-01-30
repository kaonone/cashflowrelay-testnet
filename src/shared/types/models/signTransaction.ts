import { SubsetMapStrict } from '_helpers';

export interface ITransaction {
  txid: string;
}

export type SetTransactionType = 'transferFrom' | 'addMinter' | 'createToken';
export type GetTransactionType = 'isMinter' | 'ownerOf' | 'totalSupply' | 'tokenByIndex';
export type TransactionType = SetTransactionType | GetTransactionType;

export type TransactionDataByType = SubsetMapStrict<Record<TransactionType, any>, {
  // set
  addMinter: null;
  createToken: {
    tokenId: number;
    // loanAmount: number;
    // interest: number;
    // instalmentSize: number;
    // periodicity: number;
  };
  transferFrom: {
    from: string;
    to: string;
    tokenId: number;
  };
  // get
  ownerOf: { tokenId: number };
  totalSupply: null;
  tokenByIndex: { index: number };
  isMinter: { address: string }
}>;

export type SetTransactionRequest = {
  [key in SetTransactionType]: {
    type: key;
    data: TransactionDataByType[key];
  };
}[SetTransactionType];

export type GetTransactionRequest = {
  [key in GetTransactionType]: {
    type: key;
    data: TransactionDataByType[key];
  };
}[GetTransactionType];
