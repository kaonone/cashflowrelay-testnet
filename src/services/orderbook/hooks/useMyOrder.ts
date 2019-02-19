import { useContext, Context, useEffect } from 'react';
import { ReactReduxContext, ReactReduxContextValue } from 'react-redux';
import { IAppReduxState } from 'shared/types/app';

import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';
import { InjectMyOrderProps } from '../namespace';

export default function useMyOrder(tokenId: string): InjectMyOrderProps {
  const { store, storeState } = useContext(ReactReduxContext as Context<ReactReduxContextValue<IAppReduxState>>);

  const order = selectors.selectMyOrderByTokenId(storeState, tokenId);
  const orderLoading = selectors.selectCommunication(storeState, 'myOrdersLoading');

  useEffect(() => {
    if (orderLoading.isRequesting || order) { return; }
    store.dispatch(actions.loadMyOrders({}));
  }, []);

  return { order, orderLoading };
}
