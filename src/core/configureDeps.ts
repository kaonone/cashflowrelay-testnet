import { Store } from 'redux';
import { Drizzle, generateStore, IDrizzleOptions, IContract } from 'drizzle';
import Web3 from 'web3';

import { IDependencies, IAppReduxState } from 'shared/types/app';

import Api from 'services/api/Api';

import daiABI from 'blockchain/abi/dai.json';
import C2FCFull from 'contracts/C2FCFull.json';
import { LocalStorage } from 'services/storage';

const web3 = new Web3();

const contracts: IContract[] = [
  {
    contractName: 'DAI',
    web3Contract: new web3.eth.Contract(daiABI, '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359'),
  },
  C2FCFull,
];

export default function configureDeps(_store: Store<IAppReduxState>): IDependencies {
  const api = new Api('/api');

  const options: IDrizzleOptions = { contracts };
  const drizzleStore = generateStore(options);
  const drizzle = new Drizzle(options, drizzleStore);
  const storage = new LocalStorage('v1');

  return { api, drizzle, storage };
}
