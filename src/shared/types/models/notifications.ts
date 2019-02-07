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
  sellCashflow: { txHash: string },
  sellCashflowSuccess: { txHash: string },
  sellCashflowFail: { txHash: string },
  buyCashflow: { txHash: string }
  buyCashflowSuccess: { txHash: string },
  buyCashflowFail: null,
  userPayInstallment: { txHash: string },
  userPayInstallmentSuccess: { txHash: string },
  userPayInstallmentFail: { txHash: string },
  withdrawCashFlow: { txHash: string },
  withdrawCashFlowSuccess: { txHash: string },
  withdrawCashFlowFail: { txHash: string },
}>;

export const variantByType: Record<NotificationType, NotificationVariant> = {
  addMinter: 'info',
  addMinterFail: 'negative',
  addMinterSuccess: 'positive',
  createCashFlow: 'info',
  createCashFlowFail: 'negative',
  createCashFlowSuccess: 'positive',
  buyCashflow: 'info',
  buyCashflowSuccess: 'positive',
  buyCashflowFail: 'negative',
  sellCashflow: 'info',
  sellCashflowSuccess: 'positive',
  sellCashflowFail: 'negative',
  userPayInstallment: 'info',
  userPayInstallmentSuccess: 'positive',
  userPayInstallmentFail: 'negative',
  withdrawCashFlow: 'info',
  withdrawCashFlowSuccess: 'positive',
  withdrawCashFlowFail: 'negative',
};
export type INotification = {
  [key in NotificationType]: {
    id: NotificationId;
    type: key;
    payload: NotificationPayloadByType[key];
  }
}[NotificationType];
