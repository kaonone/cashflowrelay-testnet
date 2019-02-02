import { IAction, IPlainAction, IPlainFailAction, ICommunication } from 'shared/types/redux';

export interface IReduxState {
  communication: {
    checkingIsUserSigned: ICommunication;
  };
  data: {
    confirmedAddress: string | null;
    isLogged: boolean;
  };
}

export type ICompleteAuthentication = IAction<'USER:COMPLETE_AUTHENTICATION', { address: string }>;

export type ICheckIsUserSigned = IPlainAction<'USER:CHECK_IS_USER_SIGNED'>;
export type ICheckIsUserSignedSuccess = IPlainAction<'USER:CHECK_IS_USER_SIGNED_SUCCESS'>;
export type ICheckIsUserSignedFail = IPlainFailAction<'USER:CHECK_IS_USER_SIGNED_FAIL'>;

export type ILogout = IPlainAction<'USER:LOGOUT'>;

export type Action =
  ICompleteAuthentication |
  ICheckIsUserSigned | ICheckIsUserSignedSuccess | ICheckIsUserSignedFail | ILogout;
