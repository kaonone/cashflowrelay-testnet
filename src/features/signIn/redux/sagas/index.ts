import { put, takeLatest, call } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import Web3 from 'web3';
import * as sigUtil from 'eth-sig-util';
import { PromisedReturnType } from '_helpers';
import { JsonRPCResponse } from 'web3/providers';

import { actions as userAction } from 'services/user';
import { IDependencies } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../../namespace';
import * as actions from '../actions';

const signInType: NS.ISignIn['type'] = 'SIGN_IN:SIGN_IN';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(signInType, signInSaga, deps);
  };
}

export function* signInSaga({ drizzle }: IDependencies, action: NS.ISignIn) {
  const { address } = action.payload;
  try {
    const isSigned: PromisedReturnType<typeof signMsg> = yield call(signMsg, drizzle.web3, address);
    if (!isSigned) {
      throw new Error('Is not signed');
    }
    yield put(actions.signInSuccess());
    yield put(userAction.completeAuthentication(address));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.signInFail(message));
  }
}

async function signMsg(web3: Web3, from: string): Promise<boolean> {
  return new Promise((resolve, reject) => {
    const msg = web3.utils.stringToHex('Sign this message');
    (web3.currentProvider as any).sendAsync({
      method: 'personal_sign',
      params: [msg, from],
    }, (err: Error | null, result: JsonRPCResponse) => {
      if (err) { return reject(err); }
      if (result.error) {
        return reject(result.error);
      }
      const recovered = sigUtil.recoverPersonalSignature({
        data: msg,
        sig: result.result,
      });
      if (recovered.toLowerCase() === from.toLowerCase()) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
}

export { getSaga };
