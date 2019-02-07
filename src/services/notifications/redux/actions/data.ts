import * as uuid from 'uuid';

import * as NS from '../../namespace';
import { NotificationType, NotificationPayloadByType, INotification, NotificationId } from 'shared/types/models';

// tslint:disable:max-line-length
export function pushNotification<T extends NotificationType>(type: T, payload: NotificationPayloadByType[T]): NS.IPushNotification {
  return {
    type: 'NOTIFICATIONS:PUSH_NOTIFICATION',
    payload: {
      type,
      payload,
      id: uuid(),
    } as INotification,
  };
}

export function hideNotification(notificationId: NotificationId): NS.IHideNotification {
  return {
    type: 'NOTIFICATIONS:HIDE_NOTIFICATION',
    payload: notificationId,
  };
}

export function setShowingNotification(notificationId: NotificationId): NS.ISetShowingNotification {
  return {
    type: 'NOTIFICATIONS:SET_SHOWING_NOTIFICATION',
    payload: notificationId,
  };
}
