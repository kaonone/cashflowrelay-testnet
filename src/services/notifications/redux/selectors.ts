import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.notifications;
}

export function selectNotifications(state: IAppReduxState): NS.INotification[] {
  return selectState(state).data.notifications;
}
