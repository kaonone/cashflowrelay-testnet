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



export function checkIsMinter(): NS.ICheckISMinter {
  return {
    type: 'USER:CHECK_IS_MINTER',
  };
}

export function checkIsAllowance(): NS.ICheckIsAllowance {
  return {
    type: 'USER:CHECK_IS_ALLOWANCE',
  };
}


export function setIsAllowance(payload: NS.ISetAllowance['payload']): NS.ISetAllowance {
  return {
    type: 'USER:SET_ALLOWANCE',
    payload,
  };
}
