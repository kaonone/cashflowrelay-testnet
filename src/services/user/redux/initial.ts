import { initialCommunicationField } from 'shared/helpers/redux';

import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    checkingIsUserSigned: initialCommunicationField,
  },
  data: {
    confirmedAddress: null,
    isLogged: false,
  },
};
