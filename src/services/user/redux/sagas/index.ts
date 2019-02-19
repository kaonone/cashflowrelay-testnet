import { SagaIterator, eventChannel, EventChannel } from 'redux-saga';
import { put, takeLatest, take, select, call } from 'redux-saga/effects';
import { DrizzleState } from 'drizzle';
import { awaitStateChanging } from 'shared/helpers/redux';
import * as sigUtil from 'eth-sig-util';
import { PromisedReturnType } from '_helpers';
import { BigNumber } from '@0x/utils';

import { IDependencies } from 'shared/types/app';
import { storageKeys } from 'services/storage';
import { getErrorMsg } from 'shared/helpers';
import { messageForSignature, mainContractName } from 'shared/constants';
import { NETWORK_CONFIG } from 'core/constants';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';

const completeAuthenticationType: NS.ICompleteAuthentication['type'] = 'USER:COMPLETE_AUTHENTICATION';
const checkIsUserSignedType: NS.ICheckIsUserSigned['type'] = 'USER:CHECK_IS_USER_SIGNED';
const logoutType: NS.ILogout['type'] = 'USER:LOGOUT';

const checkPermissionsType: NS.ICheckPermissions['type'] = 'USER:CHECK_PERMISSIONS';

const setMinterType: NS.ISetMinter['type'] = 'USER:SET_MINTER';
const setApprovedType: NS.ISetApproved['type'] = 'USER:SET_APPROVED';
const setPayingAllowanceType: NS.ISetPayingAllowance['type'] = 'USER:SET_PAYING_ALLOWANCE';
const setBuyingAllowanceType: NS.ISetBuyingAllowance['type'] = 'USER:SET_BUYING_ALLOWANCE';

export function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(completeAuthenticationType, listenAccountChange, deps);
    yield takeLatest(checkIsUserSignedType, checkIsUserSigned, deps);
    yield takeLatest(logoutType, logoutSaga, deps);
    yield takeLatest(checkPermissionsType, checkPermissionsSaga, deps);
    yield takeLatest(setMinterType, setMinterSaga, deps);
    yield takeLatest(setApprovedType, setApproved, deps);
    yield takeLatest(setPayingAllowanceType, setPayingAllowance, deps);
    yield takeLatest(setBuyingAllowanceType, setBuyingAllowance, deps);
  };
}

export function* checkIsUserSigned({ drizzle, storage }: IDependencies, _a: NS.ICheckIsUserSigned) {
  try {
    const result = storage.get<string>(storageKeys.signedMessage);

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

export function logoutSaga({ storage }: IDependencies, _a: NS.ILogout) {
  try {
    storage.reset();
  } catch (error) {
    console.error(error);
  }
}

// don't work because drizzle is not listen account changing
export function* listenAccountChange({ drizzle }: IDependencies, _a: NS.ICompleteAuthentication) {
  const drizzleStateChannel: EventChannel<DrizzleState> = eventChannel((emitter) => {
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

export function* checkPermissionsSaga(deps: IDependencies, _a: NS.ICheckPermissions) {
  try {
    const [isMinter, isApproved, payingAllowance, buyingAllowance]: PromisedReturnType<typeof getAllPermissions> =
      yield call(getAllPermissions, deps);
    yield put(actions.checkPermissionsSuccess({
      isMinter,
      isApproved,
      isPayingAllowance: payingAllowance.toNumber() > 0,
      isBuyingAllowance: buyingAllowance.toNumber() > 0,
    }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.checkPermissionsFail(message));
  }
}

async function getAllPermissions(
  { Ox: { contractWrappers }, drizzle }: IDependencies,
): Promise<[boolean, boolean, BigNumber, BigNumber]> {

  const account = drizzle.store.getState().accounts[0];
  const contract = drizzle.contracts[mainContractName];

  // minter
  // approved
  // payingAllowance
  // buyingAllowance
  return Promise.all([
    (contract.methods as any).isMinter(account).call(),
    contractWrappers.erc721Token.isProxyApprovedForAllAsync(NETWORK_CONFIG.c2fcContract, account),
    contractWrappers.erc20Token.getAllowanceAsync(NETWORK_CONFIG.daiContract, account, NETWORK_CONFIG.c2fcContract),
    contractWrappers.erc20Token.getProxyAllowanceAsync(NETWORK_CONFIG.daiContract, account),
  ]);
}

export function* setMinterSaga(deps: IDependencies, _a: NS.ISetMinter) {
  try {
    const { web3Wrapper } = deps.Ox;
    const { drizzle } = deps;
    const account = drizzle.store.getState().accounts[0];
    const contract = drizzle.contracts[mainContractName];
    const stackId = contract.methods.addMinter.cacheSend({ from: account });

    yield awaitStateChanging(drizzle.store, (state: DrizzleState) => Boolean(state.transactionStack[stackId]));
    const drizzleState = drizzle.store.getState();
    const txHash = drizzleState.transactionStack[stackId];
    yield call([web3Wrapper, 'awaitTransactionSuccessAsync'], txHash);
    yield put(actions.setMinterSuccess());
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.setMinterFail(message));
  }
}

export function* setApproved(deps: IDependencies, action: NS.ISetApproved) {
  try {
    const { contractWrappers, web3Wrapper } = deps.Ox;
    const { drizzle } = deps;
    const drizzleState = drizzle.store.getState();
    const account = drizzleState.accounts[0];

    const txHash = yield call([contractWrappers.erc721Token, 'setProxyApprovalForAllAsync'],
      NETWORK_CONFIG.c2fcContract,
      account,
      action.payload.isApproved,
    );
    yield call([web3Wrapper, 'awaitTransactionSuccessAsync'], txHash);
    yield put(actions.setApprovedSuccess({ isApproved: action.payload.isApproved }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.setApprovedFail(message));
  }
}

export function* setPayingAllowance(deps: IDependencies, action: NS.ISetPayingAllowance) {
  try {
    const { contractWrappers, web3Wrapper } = deps.Ox;
    const { drizzle } = deps;
    const drizzleState = drizzle.store.getState();
    const account = drizzleState.accounts[0];
    const method = action.payload.isPayingAllowance ? 'setUnlimitedAllowanceAsync' : 'setAllowanceAsync';
    const params: Record<'setUnlimitedAllowanceAsync' | 'setAllowanceAsync', any> = {
      setUnlimitedAllowanceAsync: undefined,
      setAllowanceAsync: new BigNumber(0),
    };

    const txHash = yield call([contractWrappers.erc20Token, method],
      NETWORK_CONFIG.daiContract,
      account,
      NETWORK_CONFIG.c2fcContract,
      params[method],
    );
    yield call([web3Wrapper, 'awaitTransactionSuccessAsync'], txHash);
    yield put(actions.setPayingAllowanceSuccess({ isPayingAllowance: action.payload.isPayingAllowance }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.setPayingAllowanceFail(message));
  }
}

export function* setBuyingAllowance(deps: IDependencies, action: NS.ISetBuyingAllowance) {
  try {
    const { contractWrappers, web3Wrapper } = deps.Ox;
    const { drizzle } = deps;
    const drizzleState = drizzle.store.getState();
    const account = drizzleState.accounts[0];
    const method = action.payload.isBuyingAllowance ? 'setUnlimitedProxyAllowanceAsync' : 'setProxyAllowanceAsync';
    const params: Record<'setUnlimitedProxyAllowanceAsync' | 'setProxyAllowanceAsync', any> = {
      setUnlimitedProxyAllowanceAsync: undefined,
      setProxyAllowanceAsync: new BigNumber(0),
    };

    const txHash = yield call([contractWrappers.erc20Token, method],
      NETWORK_CONFIG.daiContract,
      account,
      params[method],
    );
    yield call([web3Wrapper, 'awaitTransactionSuccessAsync'], txHash);
    yield put(actions.setBuyingAllowanceSuccess({ isBuyingAllowance: action.payload.isBuyingAllowance }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.setBuyingAllowanceFail(message));
  }
}
