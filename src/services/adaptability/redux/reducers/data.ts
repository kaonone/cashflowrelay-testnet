import * as NS from '../../namespace';
import { initial } from '../initial';

export function dataReducer(state: NS.IReduxState['data'] = initial.data, action: NS.Action): NS.IReduxState['data'] {
  switch (action.type) {
    case 'ADAPTABILITY:HYDRATED': {
      return { ...state, hydrated: true };
    }
    default: return state;
  }
}
