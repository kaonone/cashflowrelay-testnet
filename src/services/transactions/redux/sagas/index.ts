import { put, takeEvery, call, take } from 'redux-saga/effects';
import { SagaIterator, eventChannel } from 'redux-saga';
import { DrizzleState } from 'drizzle';
import { Store } from 'redux';

import { actions as notificationActions } from 'services/notifications';
import { IDependencies } from 'shared/types/app';
import { SetTransactionType, TransactionRequestDataByType } from 'shared/types/models';
import { mainContractName } from 'shared/constants';

import * as NS from '../../namespace';

const sendType: NS.ISendTransaction['type'] = 'TRANSACTIONS:SEND_TRANSACTION';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeEvery(sendType, sendSaga, deps);
  };
}

function* sendSaga({ drizzle, Ox: { web3Wrapper } }: IDependencies, action: NS.ISendTransaction) {
  const { type, data } = action.payload;
  const account = drizzle.store.getState().accounts[0];
  const contract = drizzle.contracts[mainContractName];
  const method = methodByType[type];
  const params = (getParamsByRequest[type] as ParamsConverter)(data, account);
  const stackId = contract.methods[method].cacheSend(...params, { from: account });

  yield awaitStateChanging(drizzle.store, (state: DrizzleState) => Boolean(state.transactionStack[stackId]));
  const drizzleStore = drizzle.store.getState();
  const txHash = drizzleStore.transactionStack[stackId];

  try {
    yield put(notificationActions.pushNotification({ type: 'createCashFlow', payload: { txHash }, id: txHash }));
    yield call([web3Wrapper, 'awaitTransactionSuccessAsync'], txHash);
    yield put(notificationActions.pushNotification({ type: 'createCashFlowSuccess', payload: { txHash }, id: txHash }));
  } catch (error) {
    yield put(notificationActions.pushNotification({ type: 'createCashFlowFail', payload: { txHash }, id: txHash }));
    console.error(error);
  }
}

function awaitStateChanging<R, S extends Store<R>>(store: S, predicate: (state: R) => boolean) {
  return call(function* gen() {
    const channel = eventChannel<number>(cb => store.subscribe(() => cb(1)));
    while (true) {
      yield take(channel);
      const state = store.getState();
      if (predicate(state)) {
        return;
      }
    }
  });
}

const methodByType: Record<SetTransactionType, string> = {
  addMinter: 'addMinter',
  createCashFlow: 'createCashFlow',
};

type ParamsConverter<T extends SetTransactionType = SetTransactionType> =
  (data: TransactionRequestDataByType[T], account: string) => string[];

const getParamsByRequest: { [key in SetTransactionType]: ParamsConverter<key> } = {
  addMinter: () => [],
  createCashFlow: (data) => [
    data.name,
    data.value.toFixed(0),
    data.commit.toFixed(0),
    data.interestRate.toFixed(0),
    data.duration.toFixed(0),
  ],
};

export { getSaga };
