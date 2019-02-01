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

    case 'NOTIFICATIONS:REMOVE_NOTIFICATION': {
      return {
        ...state,
        notifications: state.notifications.filter(
          notification => notification.id !== action.payload,
      ),
      };
    }
    default: return state;
  }
}
