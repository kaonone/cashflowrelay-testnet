import { SagaIterator, Channel, eventChannel } from 'redux-saga';
import { put, takeLatest, take, select, call } from 'redux-saga/effects';
import { DrizzleState } from 'drizzle';
import * as sigUtil from 'eth-sig-util';

import { IDependencies } from 'shared/types/app';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';
import { storageKeys } from 'services/storage';
import { getErrorMsg } from 'shared/helpers';
import { messageForSignature, mainContractName } from 'shared/constants';
import { networkConfig } from 'core/constants';
import { BigNumber } from '@0x/utils';

const completeAuthenticationType: NS.ICompleteAuthentication['type'] = 'USER:COMPLETE_AUTHENTICATION';
const checkIsUserSignedType: NS.ICheckIsUserSigned['type'] = 'USER:CHECK_IS_USER_SIGNED';
const logoutType: NS.ILogout['type'] = 'USER:LOGOUT';

const checkPermissionsType: NS.ICheckPermissions['type'] = 'USER:CHECK_PERMISSIONS';

const setMinterType: NS.ISetMinter['type'] = 'USER:SET_MINTER';

const setApprovedType: NS.ISetApproved['type'] = 'USER:SET_APPROVED';
const setAllowanceType: NS.ISetAllowance['type'] = 'USER:SET_ALLOWANCE';

export function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(completeAuthenticationType, listenAccountChange, deps);
    yield takeLatest(checkIsUserSignedType, checkIsUserSigned, deps);
    yield takeLatest(logoutType, logoutSaga, deps);
    yield takeLatest(checkPermissionsType, checkPermissionsSaga, deps);
    yield takeLatest(setApprovedType, setApproved, deps);
    yield takeLatest(setAllowanceType, setAllowance, deps);
    yield takeLatest(setMinterType, setMinterSaga, deps);
  };
}

export function* checkIsUserSigned({ drizzle, storage }: IDependencies) {
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

export function* checkPermissionsSaga(deps: IDependencies) {
  try {
    const [isMinter, isApproved, allowance]: [boolean, boolean, BigNumber] = yield call(getAllPermissions, deps);

    yield put(actions.checkPermissionsSuccess({
      isMinter,
      isApproved,
      isAllowance: allowance.toNumber() > 0,
    }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.checkPermissionsFail(message));
  }
}

async function getAllPermissions({ Ox: { contractWrappers }, drizzle }: IDependencies) {

  const account = drizzle.store.getState().accounts[0];
  const contract = drizzle.contracts[mainContractName];

  // minter
  // approved
  // allowance
  return Promise.all([
    (contract.methods as any).isMinter(account).call(),
    contractWrappers.erc721Token.isProxyApprovedForAllAsync(networkConfig.c2fcContract, account),
    contractWrappers.erc20Token.getAllowanceAsync(networkConfig.daiContract, account, networkConfig.c2fcContract),
  ]);
}

export function* setMinterSaga({ drizzle }: IDependencies) {

  try {
    const account = drizzle.store.getState().accounts[0];
    const contract = drizzle.contracts[mainContractName];
    contract.methods.addMinter.cacheSend({ from: account });
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
      networkConfig.c2fcContract,
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

export function* setAllowance(deps: IDependencies, action: NS.ISetAllowance) {
  try {
    const { contractWrappers, web3Wrapper } = deps.Ox;
    const { drizzle } = deps;
    const drizzleState = drizzle.store.getState();
    const account = drizzleState.accounts[0];

    const method = action.payload.isAllowance ? 'setUnlimitedAllowanceAsync' : 'setAllowanceAsync';
    const params: Record<'setUnlimitedAllowanceAsync' | 'setAllowanceAsync', any> = {
      setUnlimitedAllowanceAsync: undefined,
      setAllowanceAsync: new BigNumber(0),
    };

    const txHash = yield call([contractWrappers.erc20Token, method],
      networkConfig.daiContract,
      account,
      networkConfig.c2fcContract,
      params[method],
    );

    yield call([web3Wrapper, 'awaitTransactionSuccessAsync'], txHash);
    yield put(actions.setAllowanceSuccess({ isAllowance: action.payload.isAllowance }));

  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.setAllowanceFail(message));
  }
}
