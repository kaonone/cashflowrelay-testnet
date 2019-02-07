import { ICommunication, IPlainAction, IAction, IPlainFailAction } from 'shared/types/redux';
import { IOrder } from 'shared/types/models';

export interface IReduxState {
  communication: {
    buying: ICommunication,
  };
}

export type IBuy = IAction<'BUY_CASH_FLOW:BUY', IOrder>;
export type IBuySuccess = IPlainAction<'BUY_CASH_FLOW:BUY_SUCCESS'>;
export type IBuyFail = IPlainFailAction<'BUY_CASH_FLOW:BUY_FAIL'>;

export type Action = IBuy | IBuySuccess | IBuyFail;
