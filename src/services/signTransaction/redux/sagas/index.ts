import { SagaIterator, eventChannel } from 'redux-saga';
import { put, call, takeLatest, race, take } from 'redux-saga/effects';
import { PromisedReturnType, ArgumentTypes } from '_helpers';

import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../../namespace';
import * as actions from '../actions';

const signTransactionType: NS.ISignTransaction['type'] = 'SIGN_TRANSACTION:SIGN_TRANSACTION';
const generateABIType: NS.IGenerateABI['type'] = 'SIGN_TRANSACTION:GENERATE_ABI';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(signTransactionType, signTransactionSaga);
    yield takeLatest(generateABIType, generateABISaga, deps);
    yield takeLatest(generateABIType, listenTransactionSaga, deps);
  };
}

export function* signTransactionSaga({ payload }: NS.ISignTransaction) {
  yield put(actions.generateABI(payload));
}

export function* generateABISaga({ api }: IDependencies, { payload }: NS.IGenerateABI) {
  try {
    const abi: PromisedReturnType<typeof api.transactions.generateABI> =
      yield call(api.transactions.generateABI, payload);
    yield put(actions.generateABISuccess({ abi, uuid: payload.uuid }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.generateABIFail(message));
  }
}

export function* listenTransactionSaga({ api }: IDependencies, { payload }: NS.IGenerateABI) {
  type ChannelData = ArgumentTypes<
    ArgumentTypes<typeof api.transactions.subscribeOnTransaction>[1]
  >[0];
  const channel = eventChannel<ChannelData>(emitter => {
    return api.transactions.subscribeOnTransaction(payload.uuid, emitter);
  });
  const stopType: NS.IStopTransactionListening['type'] = 'SIGN_TRANSACTION:STOP_TRANSACTION_LISTENING';

  try {
    interface IRaceResult {
      data?: ChannelData;
      stopAction?: NS.IStopTransactionListening;
    }
    const { data }: IRaceResult = yield race({
      data: take(channel),
      stopAction: take(stopType),
    });
    if (data) {
      yield put(actions.saveSignedTransaction(data));
    }
  } catch {
    //
  } finally {
    yield call(channel.close);
  }
}

export { getSaga };
