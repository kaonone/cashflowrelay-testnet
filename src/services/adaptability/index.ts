// tslint:disable-next-line:import-blacklist
import { MobileView, BrowserView } from 'react-device-detect';

import { IReduxEntry } from 'shared/types/app';

import * as namespace from './namespace';
import { actions, selectors, reducer } from './redux';

export { MobileView, BrowserView, namespace, selectors, actions };
export * from './view/containers';

export const reduxEntry: IReduxEntry = {
  reducers: { adaptability: reducer },
};
