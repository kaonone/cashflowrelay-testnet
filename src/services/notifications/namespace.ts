import { IAction } from 'shared/types/redux';

export type notificationId = string;
export type notificationType = 'info' | 'positive' | 'negative';

export interface IReduxState {
  data: {
    notifications: INotification[];
    hideNotifications: notificationId[];
  };
}

export interface INotification {
  id: notificationId;
  title: string;
  description?: string;
  type: notificationType;
}

export type IPushNotification = IAction<'NOTIFICATIONS:PUSH_NOTIFICATION', INotification>;
export type IHideNotification = IAction<'NOTIFICATIONS:HIDE_NOTIFICATION', notificationId>;

export type Action = IPushNotification
  | IHideNotification;
