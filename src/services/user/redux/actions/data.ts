import * as NS from '../../namespace';

export function completeAuthentication(address: string): NS.ICompleteAuthentication {
  return {
    type: 'USER:COMPLETE_AUTHENTICATION',
    payload: { address },
  };
}

export function logout(): NS.ILogout {
  return {
    type: 'USER:LOGOUT',
  };
}
