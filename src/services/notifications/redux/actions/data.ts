import * as NS from '../../namespace';

export function pushNotification(info: NS.INotification): NS.IPushNotification {
  return {
    type: 'NOTIFICATIONS:PUSH_NOTIFICATION',
    payload: info,
  };
}

export function hideNotification(notificationId: NS.notificationId): NS.IHideNotification {
  return {
    type: 'NOTIFICATIONS:HIDE_NOTIFICATION',
    payload: notificationId,
  };
}
