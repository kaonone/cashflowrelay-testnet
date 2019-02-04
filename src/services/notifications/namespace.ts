import { OptionsObject as NotificationOptions } from 'notistack';

import { IAction } from 'shared/types/redux';

export type notificationId = string;

export interface IReduxState {
  data: {
    notifications: INotification[];
    hideNotifications: notificationId[];
  };
}

export interface INotification {
  id: notificationId;
  options: NotificationOptions;
  message: string;
}

export type IPushNotification = IAction<'NOTIFICATIONS:PUSH_NOTIFICATION', INotification>;
export type IHideNotification = IAction<'NOTIFICATIONS:HIDE_NOTIFICATION', notificationId>;

export type Action = IPushNotification
  | IHideNotification;
