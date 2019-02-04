import { initialCommunicationField } from 'shared/helpers/redux';

import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    checkingIsUserSigned: initialCommunicationField,
    checkingApproved: initialCommunicationField,
    settingApproved: initialCommunicationField,
    checkingAllowance: initialCommunicationField,
    settingAllowance: initialCommunicationField,
  },
  data: {
    confirmedAddress: null,
    isLogged: false,
    isChecked: false,
    isApproved: false,
  },
};
