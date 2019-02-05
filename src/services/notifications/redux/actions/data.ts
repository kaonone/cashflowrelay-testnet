import * as uuid from 'uuid';

import * as NS from '../../namespace';

export function pushNotification(info: NS.INotification): NS.IPushNotification {
  return {
    type: 'NOTIFICATIONS:PUSH_NOTIFICATION',
    payload: {
      ...info,
      id: uuid(),
    }
  };
}

export function hideNotification(notificationId: NS.NotificationId): NS.IHideNotification {
  return {
    type: 'NOTIFICATIONS:HIDE_NOTIFICATION',
    payload: notificationId,
  };
}

export function setShowingNotification(notificationId: NS.NotificationId): NS.ISetShowingNotification {
  return {
    type: 'NOTIFICATIONS:SET_SHOWING_NOTIFICATION',
    payload: notificationId,
  };
}
