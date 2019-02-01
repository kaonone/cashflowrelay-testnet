import { OptionsObject as NotificationOptions } from 'notistack';

import { IAction } from 'shared/types/redux';

export interface IReduxState {
  data: {
    notifications: INotification[];
  };
}

export interface INotification {
  id: string;
  options: NotificationOptions;
  message: string;
}

export type IPushNotification = IAction<'NOTIFICATIONS:PUSH_NOTIFICATION', INotification>;
export type IRemoveNotification = IAction<'NOTIFICATIONS:REMOVE_NOTIFICATION', string>;

export type Action = IPushNotification
  | IRemoveNotification;
