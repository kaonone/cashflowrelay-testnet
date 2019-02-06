import { takeEvery, call, put } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';
import { Order, BigNumber, assetDataUtils, generatePseudoRandomSalt, signatureUtils, orderHashUtils } from '0x.js';
import { OrderConfigRequest } from '@0x/connect';
import { Web3Wrapper } from '@0x/web3-wrapper';
import { NETWORK_CONFIG } from 'core/constants';

import { actions as orderbookActions } from 'services/orderbook';

import { IDependencies } from 'shared/types/app';
import { IToken } from 'shared/types/models';
import { getErrorMsg } from 'shared/helpers';
import { NULL_ADDRESS, DEFAULT_ORDER_EXPIRATION_DURATION, DECIMAL } from 'shared/constants';

import * as NS from '../../namespace';
import * as actions from '../actions';

const sellType: NS.ISell['type'] = 'SELL_CASH_FLOW:SELL';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeEvery(sellType, sellSaga, deps);
  };
}

export function* sellSaga(deps: IDependencies, action: NS.ISell) {
  const { price, cashflow } = action.payload;
  try {
    yield call(submitOrderToOrderBook, deps, cashflow, price);
    yield put(actions.sellSuccess());
    yield put(orderbookActions.loadMyOrders({}));
    // TODO ds: success notification
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.sellFail(message));
    // TODO ds: fail notification
  }
}

async function submitOrderToOrderBook(deps: IDependencies, token: IToken, price: number) {
  const { drizzle } = deps;
  const { contractWrappers, providerEngine, client } = deps.Ox;
  const drizzleState = drizzle.store.getState();

  const account = drizzleState.accounts[0].toLowerCase();

  const makerAssetData = assetDataUtils.encodeERC721AssetData(NETWORK_CONFIG.c2fcContract, new BigNumber(token.id));
  const takerAssetData = assetDataUtils.encodeERC20AssetData(NETWORK_CONFIG.daiContract);

  const tokenOrders = await client.getOrdersAsync({ makerAssetData });
  if (tokenOrders.total > 0) {
    throw new Error(`c2fc id:${token.id} is already for sale`);
   }

  const orderConfigRequest: OrderConfigRequest = {
    exchangeAddress: NETWORK_CONFIG.OxContracts.exchange,
    makerAddress: account,
    takerAddress: NULL_ADDRESS,
    expirationTimeSeconds: DEFAULT_ORDER_EXPIRATION_DURATION.plus(Date.now() / 1000).ceil(),
    makerAssetAmount: new BigNumber(1),
    takerAssetAmount: Web3Wrapper.toBaseUnitAmount(new BigNumber(price), DECIMAL),
    makerAssetData,
    takerAssetData,
  };
  const orderConfig = await client.getOrderConfigAsync(orderConfigRequest);

  const order: Order = {
    salt: generatePseudoRandomSalt(),
    ...orderConfigRequest,
    ...orderConfig,
  };

  const orderHashHex = orderHashUtils.getOrderHashHex(order);
  const signature = await signatureUtils.ecSignHashAsync(providerEngine, orderHashHex, account);
  const signedOrder = { ...order, signature };

  await contractWrappers.exchange.validateOrderFillableOrThrowAsync(signedOrder);

  await client.submitOrderAsync(signedOrder);
}

export { getSaga };
