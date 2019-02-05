import { IAppReduxState } from 'shared/types/app';
import { INotification, NotificationId } from 'shared/types/models';

import * as NS from '../namespace';

export function selectState(state: IAppReduxState): NS.IReduxState {
  return state.notifications;
}

export function selectNotifications(state: IAppReduxState): INotification[] {
  return selectState(state).data.notifications;
}

export function selectHideNotifications(state: IAppReduxState): NotificationId[] {
  return selectState(state).data.hideNotifications;
}

export function selectShowingNotification(state: IAppReduxState): NotificationId {
  return selectState(state).data.showingNotification;
}
