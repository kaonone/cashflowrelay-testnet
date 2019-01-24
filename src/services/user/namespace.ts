import { IAction, IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    confirmedAddress: string | null;
    isLogged: boolean;
  };
}

export type ICompleteAuthentication = IAction<'USER:COMPLETE_AUTHENTICATION', { address: string }>;
export type ILogout = IPlainAction<'USER:LOGOUT'>;

export type Action = ICompleteAuthentication | ILogout;
