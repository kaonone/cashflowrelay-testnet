import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'SIGN_TRANSACTION:SIGN_TRANSACTION': {
      return {
        ...initial.data,
        request: action.payload,
      };
    }
    case 'SIGN_TRANSACTION:STOP_TRANSACTION_LISTENING': {
      return {
        ...state,
        request: null,
      };
    }
    case 'SIGN_TRANSACTION:GENERATE_ABI_SUCCESS': {
      return {
        ...state,
        abiUrl: action.payload.abi,
      };
    }
    case 'SIGN_TRANSACTION:SAVE_SIGNED_TRANSACTION': {
      return {
        ...state,
        abiUrl: null,
        request: null,
        signedTransaction: action.payload,
      };
    }
    default: return state;
  }
}
