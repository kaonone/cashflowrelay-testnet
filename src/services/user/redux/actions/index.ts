import * as NS from '../../namespace';

export function logout(): NS.ILogout {
  return {
    type: 'USER:LOGOUT',
  };
}
export * from './data';
