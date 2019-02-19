import configureDeps from './configureDeps';
import { TYPES, container } from './configureIoc';
import configureStore, { createReducer } from './configureStore';
import { configureJss } from 'core/configureJss';

import { MarketplaceModule, CashFlowModule } from 'modules';
import { reduxEntry as adaptabilityRE } from 'services/adaptability';
import { reduxEntry as i18nRE } from 'services/i18n';
import { reduxEntry as orderbookRE } from 'services/orderbook';
import { reduxEntry as transactionsRE } from 'services/transactions';
import { reduxEntry as userRE } from 'services/user';
import { reduxEntry as notificationRE } from 'services/notifications';

import { reduxEntry as buyCashFlowRE } from 'features/buyCashFlow';
import { reduxEntry as sellCashFlowRE } from 'features/sellCashFlow';
import { reduxEntry as signInRE } from 'features/signIn';

import { ReducersMap } from 'shared/types/redux';
import { IAppData, IModule, RootSaga, IAppReduxState, IReduxEntry } from 'shared/types/app';

function configureApp(data?: IAppData): IAppData {
  /* Prepare main app elements */
  const modules: IModule[] = [
    MarketplaceModule,
    CashFlowModule,
  ];

  if (data) {
    return { ...data, modules };
  }

  const sharedReduxEntries: IReduxEntry[] = [
    adaptabilityRE,
    buyCashFlowRE,
    i18nRE,
    notificationRE,
    orderbookRE,
    sellCashFlowRE,
    signInRE,
    transactionsRE,
    userRE,
  ];

  const connectedSagas: RootSaga[] = [];
  const connectedReducers: ReducersMap<Partial<IAppReduxState>> = {};

  const { runSaga, store } = configureStore();
  try {
    container.getAll(TYPES.Store);
    container.rebind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.rebind(TYPES.Store).toConstantValue(store);
  } catch {
    container.bind(TYPES.connectEntryToStore).toConstantValue(connectEntryToStore);
    container.bind(TYPES.Store).toConstantValue(store);
  }

  const dependencies = configureDeps(store);
  const jssDeps = configureJss();

  sharedReduxEntries.forEach(connectEntryToStore);
  modules.forEach((module: IModule) => {
    if (module.getReduxEntry) {
      connectEntryToStore(module.getReduxEntry());
    }
  });

  function connectEntryToStore({ reducers, sagas }: IReduxEntry) {
    if (!store) {
      throw new Error('Cannot find store, while connecting module.');
    }

    if (reducers) {
      const keys = Object.keys(reducers) as Array<keyof typeof reducers>;
      const isNeedReplace: boolean = keys.reduce<boolean>((acc, key: keyof typeof reducers) => {
        const featureReducer = reducers[key];
        if (!connectedReducers[key] && featureReducer) {
          connectedReducers[key] = featureReducer;
          return true;
        }
        return acc || false;
      }, false);

      if (isNeedReplace) {
        store.replaceReducer(createReducer(connectedReducers as ReducersMap<IAppReduxState>));
      }
    }

    if (sagas && __CLIENT__) {
      sagas.forEach((saga: RootSaga) => {
        if (!connectedSagas.includes(saga) && runSaga) {
          runSaga(saga(dependencies));
          connectedSagas.push(saga);
        }
      });
    }
  }

  return { modules, store, jssDeps, drizzle: dependencies.drizzle };
}

export default configureApp;
