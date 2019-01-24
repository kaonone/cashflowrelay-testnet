import { PromisedReturnType } from '_helpers';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { SagaIterator } from 'redux-saga';

import { IDependencies, IAppReduxState } from 'shared/types/app';
import { getErrorMsg } from 'shared/helpers';

import * as NS from '../../namespace';
import * as actions from '../actions';
import * as selectors from '../selectors';

const loadListType: NS.ILoadList['type'] = 'DATA_PROVIDER:LOAD_LIST';
const reloadListType: NS.IReloadList['type'] = 'DATA_PROVIDER:RELOAD_LIST';

function getSaga(deps: IDependencies) {
  return function* saga(): SagaIterator {
    yield takeLatest(loadListType, loadListSaga, deps); // TODO ds: create takeLatestByInstance
    yield takeLatest(reloadListType, reloadListSaga);
  };
}

export function* loadListSaga({ api }: IDependencies, { payload, _instanceKey }: NS.ILoadList) {
  try {
    const result: PromisedReturnType<typeof api.data.loadList> = yield call(api.data.loadList, payload);
    yield put({ _instanceKey, ...actions.loadListSuccess(result) });
  } catch (error) {
    const message = getErrorMsg(error);
    yield put({ _instanceKey, ...actions.loadListFail(message) });
  }
}

export function* reloadListSaga({ _instanceKey }: NS.IReloadList) {
  // TODO ds: create selectByInstance
  const listData: ReturnType<typeof selectors.selectListData> = yield select(
    (state: IAppReduxState) => selectors.selectListData(state.dataProvider[_instanceKey]),
  );
  if (!listData.request) {
    return;
  }
  yield put({ _instanceKey, ...actions.loadList(listData.request) });
}

export { getSaga };
