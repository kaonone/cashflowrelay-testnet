import { ICommunication, IAction, IPlainFailAction, IMultiAction, IPlainAction } from 'shared/types/redux';
import { Resource, DataByResource, IListRequest, IListResponse } from 'shared/types/models';

export interface IReduxState<key extends Resource = Resource> {
  communication: {
    listLoading: ICommunication;
  };
  data: {
    list: {
      request: IListRequest<key> | null;
      items: Array<DataByResource[key]>;
      total: number;
    };
  };
}

export type ILoadList<T extends Resource = Resource> =
  IMultiAction<'DATA_PROVIDER:LOAD_LIST'> & IAction<'DATA_PROVIDER:LOAD_LIST', IListRequest<T>>;
export type ILoadListSuccess<T extends Resource = Resource> =
  IMultiAction<'DATA_PROVIDER:LOAD_LIST_SUCCESS'> & IAction<'DATA_PROVIDER:LOAD_LIST_SUCCESS', IListResponse<T>>;
export type ILoadListFail =
  IMultiAction<'DATA_PROVIDER:LOAD_LIST_FAIL'> & IPlainFailAction<'DATA_PROVIDER:LOAD_LIST_FAIL'>;

export type IReloadList = IMultiAction<'DATA_PROVIDER:RELOAD_LIST'> & IPlainAction<'DATA_PROVIDER:RELOAD_LIST'>;

export type Action = ILoadList | ILoadListSuccess | ILoadListFail | IReloadList;
