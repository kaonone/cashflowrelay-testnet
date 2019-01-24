import * as NS from '../../namespace';

export function completeAuthentication(address: string): NS.ICompleteAuthentication {
  return {
    type: 'USER:COMPLETE_AUTHENTICATION',
    payload: { address },
  };
}
