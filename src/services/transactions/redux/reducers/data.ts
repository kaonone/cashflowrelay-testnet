import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'TRANSACTIONS:BIND_TH_HASH': {
      return {
        ...state,
        txHashMap: {
          ...state.txHashMap,
          [action.payload.uuid]: action.payload.thHash,
        },
      };
    }

    default: return state;
  }
}
