import { Store } from 'redux';
import { Drizzle, generateStore, IDrizzleOptions } from 'drizzle';

import { IDependencies, IAppReduxState } from 'shared/types/app';

import Api from 'services/api/Api';

export default function configureDeps(_store: Store<IAppReduxState>): IDependencies {
  const api = new Api('/api');

  const options: IDrizzleOptions = { contracts: [] };
  const drizzleStore = generateStore(options);
  const drizzle = new Drizzle(options, drizzleStore);

  return { api, drizzle };
}
