import * as NS from '../../namespace';

export function pushNotification(info: NS.INotification): NS.IPushNotification {
  return {
    type: 'NOTIFICATIONS:PUSH_NOTIFICATION',
    payload: info,
  };
}

export function removeNotification(notificationId: string): NS.IRemoveNotification {
  return {
    type: 'NOTIFICATIONS:REMOVE_NOTIFICATION',
    payload: notificationId,
  };
}
