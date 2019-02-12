import { put, call, takeLatest, select, takeLeading } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { assetDataUtils } from '0x.js';
import { APIOrder, PaginatedCollection } from '@0x/types';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { PromisedReturnType } from '_helpers';

import { ICompleteAuthentication } from 'services/user/namespace';
import { IDependencies } from 'shared/types/app';
import { IOrder } from 'shared/types/models';
import { getErrorMsg } from 'shared/helpers';
import { DECIMAL } from 'shared/constants';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';

const loadOrdersType: NS.ILoadOrders['type'] = 'ORDERBOOK:LOAD_ORDERS';
const loadMyOrdersType: NS.ILoadMyOrders['type'] = 'ORDERBOOK:LOAD_MY_ORDERS';
const completeAuthType: ICompleteAuthentication['type'] = 'USER:COMPLETE_AUTHENTICATION';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(loadOrdersType, loadOrdersSaga, deps);
    yield takeLeading(loadMyOrdersType, loadMyOrdersSaga, deps);
    yield takeLatest(completeAuthType, loadMyOrdersByAuthenticate);
  };
}

export function* loadMyOrdersByAuthenticate() {
  yield put(actions.loadMyOrders({}));
}

export function* loadOrdersSaga(deps: IDependencies, action: NS.ILoadOrders) {
  const { client } = deps.Ox;
  const prev: ReturnType<typeof selectors.selectOrders> = yield select(selectors.selectOrders);
  const page = action.payload.page || prev.page;
  const perPage = action.payload.perPage || prev.perPage;

  try {
    const response: PromisedReturnType<typeof client.getOrdersAsync> =
      yield call([client, client.getOrdersAsync], { page, perPage });
    const convertedResponse = convertResponse(response);
    yield put(actions.loadOrdersSuccess(convertedResponse));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.loadOrdersFail(message));
  }
}

export function* loadMyOrdersSaga(deps: IDependencies, action: NS.ILoadMyOrders) {
  const { drizzle } = deps;
  const { client } = deps.Ox;
  const makerAddress = drizzle.store.getState().accounts[0].toLowerCase();
  const prev: ReturnType<typeof selectors.selectOrders> = yield select(selectors.selectOrders);
  const page = action.payload.page || prev.page;
  const perPage = action.payload.perPage || prev.perPage;

  try {
    const response: PromisedReturnType<typeof client.getOrdersAsync> =
      yield call([client, client.getOrdersAsync], { page, perPage, makerAddress });
    const convertedResponse = convertResponse(response);
    yield put(actions.loadMyOrdersSuccess(convertedResponse));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.loadMyOrdersFail(message));
  }
}

function convertResponse(response: PaginatedCollection<APIOrder>): PaginatedCollection<IOrder> {
  const { records, ...rest } = response;
  return { ...rest, records: response.records.map(convertOrder) };
}

function convertOrder({ order }: APIOrder): IOrder {
  const makerAssetData = assetDataUtils.decodeERC721AssetData(order.makerAssetData);
  const price = Web3Wrapper.toUnitAmount(order.takerAssetAmount, DECIMAL);
  return {
    ...order,
    price,
    tokenId: makerAssetData.tokenId,
  };
}

export { getSaga };
