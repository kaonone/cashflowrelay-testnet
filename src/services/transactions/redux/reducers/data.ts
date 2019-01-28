import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'TRANSACTIONS:PUSH_TRANSACTION_INFO': {
      return {
        ...state,
        sentTransactions: [...state.sentTransactions, action.payload],
      };
    }
    case 'TRANSACTIONS:DELETE_TRANSACTION_INFO': {
      return {
        ...state,
        sentTransactions: state.sentTransactions.filter(item => item.stackId !== action.payload.stackId),
      };
    }
    default: return state;
  }
}
