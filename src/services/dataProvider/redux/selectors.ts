import * as NS from '../namespace';
import { ICommunication } from 'redux-make-communication/dist/namespace';

export function selectListData(state: NS.IReduxState) {
  return state.data.list;
}

export function selectListLoading(state: NS.IReduxState): ICommunication {
  return state.communication.listLoading;
}
