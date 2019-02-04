import { put, takeEvery, select, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { SetTransactionType, TransactionRequestDataByType } from 'shared/types/models';
import { mainContractName } from 'shared/constants';
// import { actions as notificationActions } from 'services/notifications'

import * as NS from '../../namespace';
// import * as actions from '../actions';
import * as selectors from '../selectors';
import transitions from '@material-ui/core/styles/transitions';

const sendType: NS.ISendTransaction['type'] = 'TRANSACTIONS:SEND_TRANSACTION';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeEvery(sendType, sendSaga, deps);
  };
}

function* sendSaga({ drizzle, Ox: { web3Wrapper } }: IDependencies, action: NS.ISendTransaction) {
  const { type, data } = action.payload;
  const drizzleStore = drizzle.store.getState();
  const account = drizzleStore.accounts[0];
  const contract = drizzle.contracts[mainContractName];
  const method = methodByType[type];
  const params = (getParamsByRequest[type] as ParamsConverter)(data, account);
  const stackId = contract.methods[method].cacheSend(...params, { from: account });
  const txHash = drizzleStore.transactionStack[stackId];
  const transactions = yield select(selectors.selectSentTransactions);
  console.log('hash', txHash);
  console.log(transitions);
  try {
    yield call([web3Wrapper, 'awaitTransactionMinedAsync'], txHash);
    // yield put(notificationActions.pushNotification({ type: 'positive', title: txHash }));
    // yield put(actions.pushTransactionInfo({ stackId, request: action.payload }));
  } catch (error) {
    console.error(error);
  }
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
