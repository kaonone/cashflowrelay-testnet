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

const checkIsMinterType: NS.ICheckISMinter['type'] = 'USER:CHECK_IS_MINTER';
const checkApprovedType: NS.ICheckApproved['type'] = 'USER:CHECK_APPROVED';
const checkIsAllowanceType: NS.ICheckIsAllowance['type'] = 'USER:CHECK_IS_ALLOWANCE';


const setApprovedType: NS.ISetApproved['type'] = 'USER:SET_APPROVED';
const setAllowanceType: NS.ISetAllowance['type'] = 'USER:SET_ALLOWANCE';



export function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(completeAuthenticationType, listenAccountChange, deps);
    yield takeLatest(checkIsUserSignedType, checkIsUserSigned, deps);
    yield takeLatest(logoutType, logoutSaga, deps);
    yield takeLatest(checkIsMinterType, checkIsMinterSaga, deps);
    yield takeLatest(checkApprovedType, checkApprovedSaga, deps);
    yield takeLatest(setApprovedType, setApproved, deps);
    yield takeLatest(checkIsAllowanceType, checkIsAllowancePermissions, deps);
    yield takeLatest(setAllowanceType, setAllowance, deps);

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

export function* checkIsMinterSaga({ Ox: { contractWrappers }, drizzle }: IDependencies) {
  try {
    // debugger;

    const account = drizzle.store.getState().accounts[0];
    const contract = drizzle.contracts[mainContractName];
    const method = 'isMinter';
    const minter = contract.methods.renounceMinter();

    debugger;
    minter.call(account).then((res) => console.log(res));
    debugger;
    //  const params = (getParamsByRequest[type] as ParamsConverter)(data, account);
  } catch (error) {
    debugger;

    const message = getErrorMsg(error);
  }
}


export function* checkApprovedSaga({ Ox: { contractWrappers }, drizzle }: IDependencies) {
  try {
    const drizzleState = drizzle.store.getState();
    const account = drizzleState.accounts[0];
    const isApproved = yield call([contractWrappers.erc721Token, 'isProxyApprovedForAllAsync'],
      networkConfig.c2fcContract,
      account,
    );

    yield put(actions.checkIsApprovedSuccess({ isApproved }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.checkIsApprovedFail(message));
  }
}

function* setApproved(deps: IDependencies, action: NS.ISetApproved) {
  try {
    const { contractWrappers, web3Wrapper } = deps.Ox;
    const { drizzle } = deps;
    const drizzleState = drizzle.store.getState();
    const account = drizzleState.accounts[0];

    const makerERC721ApprovalTxHash = yield call([contractWrappers.erc721Token, 'setProxyApprovalForAllAsync'],
      networkConfig.c2fcContract,
      account,
      action.payload.isApproved,
    );

    yield call([web3Wrapper, 'awaitTransactionSuccessAsync'], makerERC721ApprovalTxHash);

    yield put(actions.setApprovedSuccess({ isApproved: action.payload.isApproved }));
  } catch (error) {
    const message = getErrorMsg(error);
    yield put(actions.setApprovedFail(message));
  }
}

export function* checkIsAllowanceSaga({ Ox: { contractWrappers }, drizzle }: IDependencies) {
  try {
    //  debugger;
    const drizzleState = drizzle.store.getState();

    const account = drizzleState.accounts[0];
    //    debugger;
    contractWrappers.erc721Token.isProxyApprovedForAllAsync(
      networkConfig.c2fcContract,
      account,
    ).then((res) => console.log(res));

    //    debugger;
  } catch (error) {
    debugger;

    const message = getErrorMsg(error);
  }
}


async function checkIsAllowancePermissions(deps: IDependencies) {
  const { contractWrappers, web3Wrapper } = deps.Ox;
  const { drizzle } = deps;
  const drizzleState = drizzle.store.getState();
  // debugger;
  const account = drizzleState.accounts[0];

  try {
    const checkIsApproved = await contractWrappers.erc20Token.getAllowanceAsync(
      networkConfig.daiContract,
      account,
      networkConfig.c2fcContract,
    );
    console.log(checkIsApproved.toNumber());

    debugger;

  } catch (error) {
    console.log('error', error)
    debugger;
  }

}

async function setAllowance(deps: IDependencies, action: NS.ISetAllowance) {
  const { contractWrappers, web3Wrapper } = deps.Ox;
  const { drizzle } = deps;
  const drizzleState = drizzle.store.getState();
  // debugger;
  const account = drizzleState.accounts[0];


  try {
    debugger;
    if (action.payload.isAllowed) {
      const makerERC721ApprovalTxHash = await contractWrappers.erc20Token.setUnlimitedAllowanceAsync(
        networkConfig.daiContract,
        account,
        networkConfig.c2fcContract,
      );

      const asd = await web3Wrapper.awaitTransactionSuccessAsync(makerERC721ApprovalTxHash);

    } else {
      const makerERC721ApprovalTxHash = await contractWrappers.erc20Token.setAllowanceAsync(
        networkConfig.daiContract,
        account,
        networkConfig.c2fcContract,
        new BigNumber(0),
      );

      const asd = await web3Wrapper.awaitTransactionSuccessAsync(makerERC721ApprovalTxHash);
      console.log('remove');
    }




    console.log('ok')

  } catch (error) {
    console.log(error)
  }

}