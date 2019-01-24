import { combineReducers } from 'redux';
import { ReducersMap } from 'shared/types/redux';

import * as NS from '../../namespace';
import { communicationReducer } from './communication';

export default combineReducers<NS.IReduxState>({
  communication: communicationReducer,
} as ReducersMap<NS.IReduxState>);
