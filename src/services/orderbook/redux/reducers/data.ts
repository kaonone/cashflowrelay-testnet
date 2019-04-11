import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'ORDERBOOK:LOAD_ORDERS_SUCCESS': {
      return {
        ...state,
        orders: action.payload,
      };
    }

    case 'ORDERBOOK:LOAD_MY_ORDERS_SUCCESS': {
      return {
        ...state,
        myOrders: action.payload,
      };
    }

    case 'ORDERBOOK:HIDE_ORDER': {
      return {
        ...state,
        hideOrders: [...state.hideOrders, action.payload],
      };
    }
    default: return state;
  }
}
