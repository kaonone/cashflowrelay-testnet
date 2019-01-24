import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'DATA_PROVIDER:LOAD_LIST': {
      return {
        ...state,
        list: {
          ...state.list,
          request: action.payload,
        },
      };
    }
    case 'DATA_PROVIDER:LOAD_LIST_SUCCESS': {
      return {
        ...state,
        list: {
          ...state.list,
          items: action.payload.data,
          total: action.payload.total,
        },
      };
    }
    case 'DATA_PROVIDER:LOAD_LIST_FAIL': {
      return {
        ...state,
        list: initial.data.list,
      };
    }
    default: return state;
  }
}
