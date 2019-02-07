import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'NOTIFICATIONS:PUSH_NOTIFICATION': {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          action.payload,
        ],
      };
    }

    case 'NOTIFICATIONS:HIDE_NOTIFICATION': {
      return {
        ...state,
        hideNotifications: [...state.hideNotifications, action.payload],
      };
    }

    case 'NOTIFICATIONS:SET_SHOWING_NOTIFICATION': {
      return {
        ...state,
        showingNotification: action.payload,
      };
    }

    default: return state;
  }
}
