import { SagaIterator, Channel, eventChannel } from 'redux-saga';
import { put, takeLatest, take, select } from 'redux-saga/effects';
import { DrizzleState } from 'drizzle';

import { IDependencies } from 'shared/types/app';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';

const completeAuthenticationType: NS.ICompleteAuthentication['type'] = 'USER:COMPLETE_AUTHENTICATION';

export function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(completeAuthenticationType, listenAccountChange, deps);
  };
}

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
