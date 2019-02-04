import { IAction } from 'shared/types/redux';

export type notificationId = string;
export type notificationType = 'info' | 'positive' | 'negative';

export interface IReduxState {
  data: {
    notifications: INotificationWithId[];
    hideNotifications: notificationId[];
    showingNotification: notificationId,
  };
}

export interface INotification {
  title: string;
  description?: string;
  type: notificationType;
}

export interface INotificationWithId extends INotification {
  id: notificationId;
}

export type IPushNotification = IAction<'NOTIFICATIONS:PUSH_NOTIFICATION', INotificationWithId>;
export type IHideNotification = IAction<'NOTIFICATIONS:HIDE_NOTIFICATION', notificationId>;
export type ISetShowingNotification = IAction<'NOTIFICATIONS:SET_SHOWING_NOTIFICATION', notificationId>;

export type Action = IPushNotification
  | IHideNotification
  | ISetShowingNotification;
