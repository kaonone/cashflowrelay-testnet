import { Store } from 'redux';
import { Drizzle, generateStore, IDrizzleOptions, IContract } from 'drizzle';

import Api from 'services/api/Api';
import { IDependencies, IAppReduxState } from 'shared/types/app';

import daiABI from 'blockchain/abi/dai.json';
import C2FCFull from 'contracts/C2FCFull.json';
import { LocalStorage } from 'services/storage';

import { RPCSubprovider, Web3ProviderEngine, ContractWrappers } from '0x.js';
import { HttpClient } from '@0x/connect';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { MetamaskSubprovider } from '@0x/subproviders';
import { NETWORK_CONFIG, RELAYER_URL } from './constants';

function getNetworks(contractAddress: string) {
  const defaultNetwork = { address: contractAddress };
  return new Proxy({}, {
    get: () => defaultNetwork,
  });
}

const contracts: IContract[] = [
  {
    contractName: 'DAI',
    abi: daiABI as IContract['abi'],
    networks: getNetworks(NETWORK_CONFIG.daiContract),
  },
  {
    ...C2FCFull,
    networks: getNetworks(NETWORK_CONFIG.c2fcContract),
  } as IContract,
];

export default function configureDeps(_store: Store<IAppReduxState>): IDependencies {
  const api = new Api('/api');

  const options: IDrizzleOptions = { contracts };
  const drizzleStore = generateStore(options);
  const drizzle = new Drizzle(options, drizzleStore);
  const storage = new LocalStorage('v1');

  const providerEngine = new Web3ProviderEngine();
  if ((window as any).web3 && (window as any).web3.currentProvider) {
    providerEngine.addProvider(new MetamaskSubprovider((window as any).web3.currentProvider));
  }
  providerEngine.addProvider(new RPCSubprovider(NETWORK_CONFIG.rpcUrl));
  providerEngine.start();

  const web3Wrapper = new Web3Wrapper(providerEngine);
  const contractWrappers = new ContractWrappers(providerEngine, { networkId: NETWORK_CONFIG.id });
  const client0x = new HttpClient(RELAYER_URL);

  return {
    api,
    drizzle,
    storage,
    Ox: {
      providerEngine,
      client: client0x,
      contractWrappers,
      web3Wrapper,
    },
  };
}
