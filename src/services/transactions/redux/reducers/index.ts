import { combineReducers } from 'redux';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import { dataReducer } from './data';

export default combineReducers<NS.IReduxState>({
  data: dataReducer,
} as ReducersMap<NS.IReduxState>);
