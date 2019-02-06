import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'USER:CHECK_IS_USER_SIGNED_FAIL':
    case 'USER:CHECK_IS_USER_SIGNED_SUCCESS': {
      return {
        ...state,
        isCheckedAuth: true,
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
        isCheckedAuth: true,
      };
    }
    case 'USER:CHECK_PERMISSIONS_SUCCESS': {
      return {
        ...state,
        isMinter: action.payload.isMinter,
        isApproved: action.payload.isApproved,
        isPayingAllowance: action.payload.isPayingAllowance,
        isBuyingAllowance: action.payload.isBuyingAllowance,
        isCheckedPermissions: true,
      };
    }
    case 'USER:CHECK_PERMISSIONS_FAIL': {
      return {
        ...state,
        isCheckedPermissions: true,
      };
    }
    case 'USER:SET_MINTER_SUCCESS': {
      return {
        ...state,
        isMinter: true,
      };
    }
    case 'USER:SET_APPROVED_SUCCESS': {
      return {
        ...state,
        isApproved: action.payload.isApproved,
      };
    }
    case 'USER:SET_PAYING_ALLOWANCE_SUCCESS': {
      return {
        ...state,
        isPayingAllowance: action.payload.isPayingAllowance,
      };
    }
    case 'USER:SET_BUYING_ALLOWANCE_SUCCESS': {
      return {
        ...state,
        isBuyingAllowance: action.payload.isBuyingAllowance,
      };
    }
    default: return state;
  }
}
