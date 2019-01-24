import * as NS from '../namespace';
import { initialCommunicationField } from 'redux-make-communication';

export const initial: NS.IReduxState = {
  communication: {
    listLoading: initialCommunicationField,
  },
  data: {
    list: {
      items: [],
      request: null,
      total: 0,
    },
  },
};
