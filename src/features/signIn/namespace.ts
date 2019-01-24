import { ICommunication, IPlainAction, IAction, IPlainFailAction } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    signing: ICommunication;
  };
}

export type ISignIn = IAction<'SIGN_IN:SIGN_IN', { address: string }>;
export type ISignInSuccess = IPlainAction<'SIGN_IN:SIGN_IN_SUCCESS'>;
export type ISignInFail = IPlainFailAction<'SIGN_IN:SIGN_IN_FAIL'>;

export type Action = ISignIn | ISignInSuccess | ISignInFail;
