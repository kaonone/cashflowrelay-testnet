import * as React from 'react';
import { Omit } from '_helpers';
import { bind } from 'decko';
import { connect } from 'react-redux';

import { InjectOrderbookProps } from 'services/orderbook/namespace';
import { IAppReduxState } from 'shared/types/app';
import { IOrderList } from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import { actions, selectors } from '../../../redux';

interface IStateProps {
  loading: ICommunication;
  orders: IOrderList;
}

type IActionProps = typeof mapDispatch;

function mapState(state: IAppReduxState): IStateProps {
  return {
    loading: selectors.selectCommunication(state, 'allOrdersLoading'),
    orders: selectors.selectOrders(state),
  };
}

const mapDispatch = {
  load: actions.loadOrders,
};

function withOrderbook<TProps extends InjectOrderbookProps>(
  WrappedComponent: React.ComponentType<TProps>,
): React.ComponentClass<Omit<TProps, keyof InjectOrderbookProps>> {
  const wrappedComponentName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  class WithOrderbook extends React.Component<TProps & IStateProps & IActionProps> {
    public static displayName: string = `WithOrderbook(${wrappedComponentName})`;

    public componentDidMount() {
      this.props.load({});
    }

    public render() {
      const { loading, orders, hideOrders, load, ...rest } = this.props;
      return (
        <WrappedComponent {...rest as TProps} orders={orders} ordersLoading={loading} loadMore={this.loadMore} />
      );
    }

    @bind
    private loadMore() {
      const { orders, load } = this.props;
      load({ page: 1, perPage: orders.perPage + 20 });
    }
  }

  return connect<IStateProps, IActionProps, TProps>(mapState, mapDispatch)(WithOrderbook as any);
}

export default withOrderbook;
