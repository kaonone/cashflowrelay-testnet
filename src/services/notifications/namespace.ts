import { IAction } from 'shared/types/redux';
import { INotification, NotificationId } from 'shared/types/models';

export interface IReduxState {
  data: {
    notifications: INotification[];
    hideNotifications: NotificationId[];
    showingNotification: NotificationId,
  };
}

export type IPushNotification = IAction<'NOTIFICATIONS:PUSH_NOTIFICATION', INotification>;
export type IHideNotification = IAction<'NOTIFICATIONS:HIDE_NOTIFICATION', NotificationId>;
export type ISetShowingNotification = IAction<'NOTIFICATIONS:SET_SHOWING_NOTIFICATION', NotificationId>;

export type Action = IPushNotification
  | IHideNotification
  | ISetShowingNotification;
