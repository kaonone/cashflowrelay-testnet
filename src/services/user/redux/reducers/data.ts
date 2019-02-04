import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'USER:CHECK_IS_USER_SIGNED_FAIL':
    case 'USER:CHECK_IS_USER_SIGNED_SUCCESS': {
      return {
        ...state,
        isChecked: true,
      };
    }
    case 'USER:COMPLETE_AUTHENTICATION': {
      return {
        ...state,
        confirmedAddress: action.payload.address,
        isLogged: true,
      };
    }
    case 'USER:LOGOUT': {
      return {
        ...initial.data,
        isChecked: true,
      };
    }
    case 'USER:CHECK_APPROVED_SUCCESS':
    case 'USER:SET_APPROVED_SUCCESS': {
      return {
        ...state,
        isApproved: action.payload.isApproved,
      };
    }
    default: return state;
  }
}
