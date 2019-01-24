import * as NS from '../../namespace';
import { makeCommunicationActionCreators } from 'redux-make-communication';

export const { execute: loadList, completed: loadListSuccess, failed: loadListFail } =
  makeCommunicationActionCreators<NS.ILoadList, NS.ILoadListSuccess, NS.ILoadListFail>(
    'DATA_PROVIDER:LOAD_LIST', 'DATA_PROVIDER:LOAD_LIST_SUCCESS', 'DATA_PROVIDER:LOAD_LIST_FAIL',
  );

export function reloadList(): NS.IReloadList {
  return {
    _instanceKey: '',
    type: 'DATA_PROVIDER:RELOAD_LIST',
  };
}
