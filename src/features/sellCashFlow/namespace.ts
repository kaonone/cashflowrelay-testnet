import { IAction, ICommunication, IPlainAction, IPlainFailAction } from 'shared/types/redux';
import { IToken } from 'shared/types/models';

export interface IReduxState {
  communication: {
    selling: ICommunication;
  };
}

export type ISell = IAction<'SELL_CASH_FLOW:SELL', { cashflow: IToken; price: number }>;
export type ISellSuccess = IPlainAction<'SELL_CASH_FLOW:SELL_SUCCESS'>;
export type ISellFail = IPlainFailAction<'SELL_CASH_FLOW:SELL_FAIL'>;

export type Action = ISell | ISellSuccess | ISellFail;
