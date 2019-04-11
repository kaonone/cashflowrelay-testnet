import { useContext, Context, useEffect, useCallback } from 'react';
import { ReactReduxContext, ReactReduxContextValue } from 'react-redux';
import { IAppReduxState } from 'shared/types/app';

import * as actions from '../redux/actions';
import * as selectors from '../redux/selectors';
import { InjectOrderbookProps } from '../namespace';

export default function useOrderbook(): InjectOrderbookProps {
  const { store, storeState } = useContext(ReactReduxContext as Context<ReactReduxContextValue<IAppReduxState>>);

  useEffect(() => {
    store.dispatch(actions.loadOrders({}));
  }, []);

  const orders = selectors.selectOrders(storeState);
  const ordersLoading = selectors.selectCommunication(storeState, 'allOrdersLoading');

  const loadMore = useCallback(() => {
    store.dispatch(actions.loadOrders({ page: 1, perPage: orders.perPage + 20 }));
  }, [orders.perPage]);

  return { orders, ordersLoading, loadMore };
}
