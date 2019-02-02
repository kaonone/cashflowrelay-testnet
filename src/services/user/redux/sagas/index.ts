import { SagaIterator, Channel, eventChannel } from 'redux-saga';
import { put, takeLatest, take, select } from 'redux-saga/effects';
import { DrizzleState } from 'drizzle';
import * as sigUtil from 'eth-sig-util';

import { IDependencies } from 'shared/types/app';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { storageKeys } from 'services/storage';
import { getErrorMsg } from 'shared/helpers';
import { messageForSignature } from 'shared/constants';

const completeAuthenticationType: NS.ICompleteAuthentication['type'] = 'USER:COMPLETE_AUTHENTICATION';
const checkIsUserSignedType: NS.ICheckIsUserSigned['type'] = 'USER:CHECK_IS_USER_SIGNED';
const logoutType: NS.ILogout['type'] = 'USER:LOGOUT';

export function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(completeAuthenticationType, listenAccountChange, deps);
    yield takeLatest(checkIsUserSignedType, checkIsUserSigned, deps);
    yield takeLatest(logoutType, logoutSaga, deps);

  };
}

export function* checkIsUserSigned({ drizzle, storage }: IDependencies) {
  try {
    const result = storage.get<string>(storageKeys.signResult);

    if (result) {
      const msg = drizzle.web3.utils.stringToHex(messageForSignature);
      const recovered = sigUtil.recoverPersonalSignature({
        data: msg,
        sig: result,
      });
      const drizzleState = drizzle.store.getState();
      const address = drizzleState.accounts[0];

      if (recovered.toLowerCase() === address.toLowerCase()) {
        yield put(actions.completeAuthentication(address));
      }
    }

    yield put(actions.checkIsUserSignedSuccess());

  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.checkIsUserSignedFail(message));
  }
}

export function logoutSaga({ storage }: IDependencies) {
  try {
    storage.reset();
  } catch (error) {
    console.log(error);
  }
}

// don't work because drizzle is not listen account changing
export function* listenAccountChange({ drizzle }: IDependencies) {
  const drizzleStateChannel: Channel<DrizzleState> = eventChannel((emitter) => {
    return drizzle.store.subscribe(() => {
      emitter(drizzle.store.getState());
    });
  });

  try {
    while (true) {
      const drizzleState: DrizzleState = yield take(drizzleStateChannel);
      const confirmedAddress: ReturnType<typeof selectors.selectConfirmedAddress> =
        yield select(selectors.selectConfirmedAddress);

      if (!confirmedAddress || confirmedAddress !== drizzleState.accounts[0]) {
        yield put(actions.logout());
        return;
      }
    }
  } catch (error) {
    //
  } finally {
    drizzleStateChannel.close();
  }
}
