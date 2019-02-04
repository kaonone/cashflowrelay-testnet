import { IAppReduxState } from 'shared/types/app';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.notifications;
}

export function selectNotifications(state: IAppReduxState): NS.INotificationWithId[] {
  return selectState(state).data.notifications;
}

export function selectHideNotifications(state: IAppReduxState): NS.notificationId[] {
  return selectState(state).data.hideNotifications;
}

export function selectShowingNotification(state: IAppReduxState): NS.notificationId {
  return selectState(state).data.showingNotification;
}
