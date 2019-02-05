import { IAction } from 'shared/types/redux';
import { tKeys } from 'services/i18n';
import { SubSet } from '_helpers';

export type NotificationId = string;
export type NotificationVariant = 'info' | 'positive' | 'negative';
export type NotificationType = Exclude<keyof typeof tKeys.services.notifications.title, 'concat'>;

export type NotificationPayloadByType = SubSet<Record<NotificationType, any>, {
  addMinter: { txHash: string },
  addMinterFail: { txHash: string },
  addMinterSuccess: { txHash: string },
  createCashFlow: { txHash: string },
  createCashFlowFail: { txHash: string },
  createCashFlowSuccess: { txHash: string },
}>;

export const variantByType: Record<NotificationType, NotificationVariant> = {
  addMinter: 'info',
  addMinterFail: 'negative',
  addMinterSuccess: 'positive',
  createCashFlow: 'info',
  createCashFlowFail: 'negative',
  createCashFlowSuccess: 'positive',
};

export interface IReduxState {
  data: {
    notifications: INotification[];
    hideNotifications: NotificationId[];
    showingNotification: NotificationId,
  };
}

export type INotification = {
  [key in NotificationType]: {
    id?: NotificationId;
    type: key;
    payload: NotificationPayloadByType[key];
  }
}[NotificationType];

export type IPushNotification = IAction<'NOTIFICATIONS:PUSH_NOTIFICATION', INotification>;
export type IHideNotification = IAction<'NOTIFICATIONS:HIDE_NOTIFICATION', NotificationId>;
export type ISetShowingNotification = IAction<'NOTIFICATIONS:SET_SHOWING_NOTIFICATION', NotificationId>;

export type Action = IPushNotification
  | IHideNotification
  | ISetShowingNotification;
