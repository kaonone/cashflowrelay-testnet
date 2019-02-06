import { getContractAddressesForNetworkOrThrow, ContractAddresses } from '@0x/contract-addresses';
import getEnvParams from './getEnvParams';

interface INetworkConfig {
  id: number;
  rpcUrl: string;
  daiContract: string;
  c2fcContract: string;
  OxContracts: ContractAddresses;
}

const networkConfigs: Record<string, INetworkConfig> = {
  '42': {
    id: 42,
    rpcUrl: 'https://kovan.infura.io/',
    daiContract: '0xC4375B7De8af5a38a93548eb8453a498222C4fF2',
    c2fcContract: '0xb272fA8bD66fbD310165d322Febd5e275081f886',
    OxContracts: getContractAddressesForNetworkOrThrow(42),
  },
  '1': {
    id: 1,
    rpcUrl: 'https://mainnet.infura.io/',
    daiContract: '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359',
    c2fcContract: '',
    OxContracts: getContractAddressesForNetworkOrThrow(1),
  },
};

export const NETWORK_CONFIG = networkConfigs[getEnvParams().network];
export const RELAYER_URL = 'https://api.cashflowrelay.com/v2';
export const ROUTES_PREFIX = '';
