import * as NS from '../namespace';

export const initial: NS.IReduxState = {
  communication: {
    abiGeneration: { error: '', isRequesting: false },
  },
  data: {
    abiUrl: null,
    request: null,
    signedTransaction: null,
  },
};
