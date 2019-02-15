
declare module 'drizzle' {
  import Web3 from 'web3';
  import { Store } from 'redux';
  import Contract from 'web3/eth/contract';
  import { ABIDefinition } from 'web3/eth/abi';

  export interface DrizzleState {
    accountBalances: Record<AccountAddress, string>;
    accounts: Record<number, AccountAddress>;
    contracts: Record<string, {
      [fnName: string]: Record<string, undefined | {
        args: any[];
        fnIndex: number;
        value: any;
      }>;
    }>;
    drizzleStatus: {
      initialized: boolean;
    }
    transactionStack: Record<string, string>; // [] | unknown;
    transactions: Record<string, {
      status: string;
    }>;
    web3: {
      status: 'initialized' | 'failed';
      networkId?: 1 | 2 | 3 | 4 | 42; // https://github.com/MetaMask/faq/blob/master/DEVELOPERS.md#construction_worker-network-check
    };
  }

  export type DrizzleStore = Store<DrizzleState>;

  export interface IContract {
    contractName: string;
    abi?: ABIDefinition[];
    web3Contract?: Contract;
    networks?: Record<string, {
      address: string;
    }>;
  }

  export interface IDrizzleOptions {
    contracts: IContract[];
  }

  export class Drizzle {
    constructor(options: IDrizzleOptions, drizzleStore: DrizzleStore);

    public addContract(contract: IContract): void;

    public contractList: IContract[];
    public contracts: Record<string, {
      methods: {
        [fnName: string]: {
          cacheCall(...args: any[]): string;
          cacheSend(...args: any[]): string;
        };
      };
    }>;
    public loadingContract: {} | unknown;
    public options: IDrizzleOptions;
    public store: DrizzleStore;
    public web3: Web3; // at the first render is {}, you need to wrap your app in LoadingContainer, which will block the render of children if web3 is not initialized
  }

  type AccountAddress = string;

  export const generateStore: (options: IDrizzleOptions) => DrizzleStore;
}
