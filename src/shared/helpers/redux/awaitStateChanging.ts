import { Store } from 'redux';
import { eventChannel } from 'redux-saga';
import { take, call } from 'redux-saga/effects';

export default function awaitStateChanging<R, S extends Store<R>>(store: S, predicate: (state: R) => boolean) {
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
