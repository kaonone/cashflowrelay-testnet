import { initialCommunicationField } from 'shared/helpers/redux';

import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    checkingIsUserSigned: initialCommunicationField,
    checkingPermissions: initialCommunicationField,
    settingApproved: initialCommunicationField,
    settingAllowance: initialCommunicationField,
    settingMinter: initialCommunicationField,
  },
  data: {
    confirmedAddress: null,
    isLogged: false,
    isCheckedAuth: false,
    isCheckedPermissions: false,
    isApproved: false,
    isAllowance: false,
    isMinter: false,
  },
};
