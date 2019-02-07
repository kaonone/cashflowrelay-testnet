import * as NS from '../namespace';
import { initialCommunicationField } from 'redux-make-communication';

export const initial: NS.IReduxState = {
  communication: {
    allOrdersLoading: initialCommunicationField,
    myOrdersLoading: initialCommunicationField,
  },
  data: {
    myOrders: {
      page: 1,
      perPage: 1000,
      records: [],
      total: 0,
    },
    orders: {
      page: 1,
      perPage: 20,
      records: [],
      total: 0,
    },
    hideOrders: [],
  },
};
