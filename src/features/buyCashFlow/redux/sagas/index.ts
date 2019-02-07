import { put, call, takeEvery } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { actions as notsActions } from 'services/notifications';
import { actions as orderbookActions } from 'services/orderbook';
import { IDependencies } from 'shared/types/app';
import { IOrder } from 'shared/types/models';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../../namespace';
import * as actions from '../actions';

const buyType: NS.IBuy['type'] = 'BUY_CASH_FLOW:BUY';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeEvery(buyType, buySaga, deps);
  };
}

export function* buySaga(deps: IDependencies, action: NS.IBuy) {
  try {
    yield call(buyOrder, deps, action.payload);
    yield put(actions.buySuccess());
    yield put(orderbookActions.loadOrders({}));
    yield put(orderbookActions.hideOrder(action.payload.tokenId));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.buyFail(message));
  }
}

function* buyOrder(deps: IDependencies, order: IOrder) {
  const { drizzle } = deps;
  const { contractWrappers, web3Wrapper } = deps.Ox;
  const drizzleState = drizzle.store.getState();
  const account = drizzleState.accounts[0].toLowerCase();

  try {
    const txHash = yield contractWrappers.exchange.marketBuyOrdersAsync([order], order.takerAssetAmount, account);
    yield put(notsActions.pushNotification('buyCashflow', { txHash }));
    yield web3Wrapper.awaitTransactionSuccessAsync(txHash);
    yield put(notsActions.pushNotification('buyCashflowSuccess', { txHash }));
  } catch (error) {
    yield put(notsActions.pushNotification('buyCashflowFail', null));
  }
}

export { getSaga };
