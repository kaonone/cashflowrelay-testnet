import { Store } from 'redux';
import { eventChannel } from 'redux-saga';
import { take, call } from 'redux-saga/effects';
import { DrizzleStore, DrizzleState } from 'drizzle';

export function awaitDrizzleTransactionSuccess(store: DrizzleStore, txHash: string) {
  return awaitStateChanging(store, (state: DrizzleState) => {
    const transaction = state.transactions[txHash];
    if (transaction.status === 'pending') {
      return false;
    } else if (transaction.status === 'success') {
      return true;
    }

    throw new Error(`Failed transaction: ${txHash}`);
  });
}

export function awaitStateChanging<R, S extends Store<R>>(store: S, predicate: (state: R) => boolean) {
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
