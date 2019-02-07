import { initialCommunicationField } from 'shared/helpers/redux';

import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    checkingIsUserSigned: initialCommunicationField,
    checkingPermissions: initialCommunicationField,
    settingMinter: initialCommunicationField,
    settingApproved: initialCommunicationField,
    settingPayingAllowance: initialCommunicationField,
    settingBuyingAllowance: initialCommunicationField,
  },
  data: {
    confirmedAddress: null,
    isLogged: false,
    isCheckedAuth: false,
    isCheckedPermissions: false,
    isMinter: false,
    isApproved: false,
    isPayingAllowance: false,
    isBuyingAllowance: false,
  },
};
