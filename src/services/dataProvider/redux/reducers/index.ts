import { combineReducers } from 'redux';

import { ReducersMap } from 'shared/types/redux';
import * as NS from '../../namespace';

import { communicationReducer } from './communication';
import { dataReducer } from './data';
import { multiReducer } from 'shared/helpers/redux';

export default (
  multiReducer<NS.IReduxState>(
    combineReducers<NS.IReduxState>({
      communication: communicationReducer,
      data: dataReducer,
    } as ReducersMap<NS.IReduxState>),
  )
);
