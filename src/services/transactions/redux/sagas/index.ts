import { put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { SetTransactionType, TransactionRequestDataByType } from 'shared/types/models';
import { mainContractName } from 'shared/constants';

import * as NS from '../../namespace';
import * as actions from '../actions';

const sendType: NS.ISendTransaction['type'] = 'TRANSACTIONS:SEND_TRANSACTION';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeEvery(sendType, sendSaga, deps);
  };
}

function* sendSaga({ drizzle }: IDependencies, action: NS.ISendTransaction) {
  const { type, data } = action.payload;
  const account = drizzle.store.getState().accounts[0];
  const contract = drizzle.contracts[mainContractName];
  const method = methodByType[type];
  const params = (getParamsByRequest[type] as ParamsConverter)(data, account);

  try {
    const stackId = contract.methods[method].cacheSend(...params, { from: account });
    yield put(actions.pushTransactionInfo({ stackId, request: action.payload }));
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
