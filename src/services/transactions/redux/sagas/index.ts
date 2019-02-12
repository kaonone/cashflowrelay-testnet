import { put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { DrizzleState } from 'drizzle';

import { actions as notificationActions } from 'services/notifications';
import { IDependencies } from 'shared/types/app';
import { SetTransactionType, TransactionRequestDataByType, NotificationType } from 'shared/types/models';
import { mainContractName } from 'shared/constants';
import { awaitStateChanging, awaitDrizzleTransactionSuccess } from 'shared/helpers/redux';

import * as actions from '../../redux/actions';
import * as NS from '../../namespace';

const sendType: NS.ISendTransaction['type'] = 'TRANSACTIONS:SEND_TRANSACTION';
const notsByType: Record<SetTransactionType, NotificationType[]> = {
  createCashFlow: ['createCashFlow', 'createCashFlowSuccess', 'createCashFlowFail'],
  addMinter: ['addMinter', 'addMinterSuccess', 'addMinterFail'],
  createOrder: ['addMinter', 'addMinterSuccess', 'addMinterFail'],
  executeOrder: ['userPayInstallment', 'userPayInstallmentSuccess', 'userPayInstallmentFail'],
  executePayment: ['userPayInstallment', 'userPayInstallmentSuccess', 'userPayInstallmentFail'],
  withdrawPayments: ['withdrawCashFlow', 'withdrawCashFlowSuccess', 'withdrawCashFlowFail'],
};

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeEvery(sendType, sendSaga, deps);
  };
}

function* sendSaga({ drizzle }: IDependencies, action: NS.ISendTransaction) {
  const { request: { type, data }, uuid } = action.payload;
  const account = drizzle.store.getState().accounts[0];
  const contract = drizzle.contracts[mainContractName];
  const method = methodByType[type];
  const params = (getParamsByRequest[type] as ParamsConverter)(data, account);
  const stackId = contract.methods[method].cacheSend(...params, { from: account });

  yield awaitStateChanging(drizzle.store, (state: DrizzleState) => Boolean(state.transactionStack[stackId]));
  const drizzleStore = drizzle.store.getState();
  const txHash = drizzleStore.transactionStack[stackId];
  const [not, notSuccess, notFail] = notsByType[type];
  yield put(actions.bindTxHash(uuid, txHash));
  try {
    yield put(notificationActions.pushNotification(not, { txHash }));
    yield awaitDrizzleTransactionSuccess(drizzle.store, txHash);
    yield put(notificationActions.pushNotification(notSuccess, { txHash }));
  } catch (error) {
    yield put(notificationActions.pushNotification(notFail, { txHash }));
    console.error(error);
  }
}

const methodByType: Record<SetTransactionType, string> = {
  addMinter: 'addMinter',
  createCashFlow: 'createCashFlow',
  createOrder: 'createOrder',
  executeOrder: 'executeOrder',
  executePayment: 'executePayment',
  withdrawPayments: 'withdrawPayments',
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
  createOrder: (data) => [
    data.tokenId,
    data.amount.toFixed(0),
  ],
  executeOrder: (data) => [
    data.tokenId,
    data.orderId.toFixed(0),
  ],
  executePayment: (data) => [
    data.tokenId,
    data.amount.toFixed(0),
  ],
  withdrawPayments: (data) => [
    data.tokenId,
    data.amount.toFixed(0),
  ],
};

export { getSaga };
