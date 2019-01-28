import { put, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies } from 'shared/types/app';
import { TransactionType, TransactionRequest } from 'shared/types/models';
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
  const { type } = action.payload;
  const account = drizzle.store.getState().accounts[0];
  const contract = drizzle.contracts[mainContractName];
  const method = methodByType[type];
  const params = getParamsByRequest(action.payload, account);

  try {
    const stackId = contract.methods[method].cacheSend(...params, { from: account });
    yield put(actions.pushTransactionInfo({ stackId, request: action.payload }));
  } catch (error) {
    console.error(error);
  }
}

const methodByType: Record<TransactionType, string> = {
  addMinter: 'addMinter',
  createToken: 'mint',
};

function getParamsByRequest(request: TransactionRequest, account: string): string[] {
  switch (request.type) {
    case 'addMinter': return [];
    case 'createToken': return [account, request.data.tokenId.toString()];
    default: return [];
  }
}

export { getSaga };
