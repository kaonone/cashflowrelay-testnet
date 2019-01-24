import { IPlainAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    hydrated: boolean;
  };
}

export type IHydrated = IPlainAction<'ADAPTABILITY:HYDRATED'>;

export type Action = IHydrated;
