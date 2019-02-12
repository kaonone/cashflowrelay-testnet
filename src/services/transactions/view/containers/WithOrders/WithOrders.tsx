import * as React from 'react';
import { BigNumber } from '0x.js';

import { IPaymentOrder, IBlockChainPaymentOrder } from 'shared/types/models';
import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';
import { mainContractName } from 'shared/constants';
import { OneDAI } from 'shared/helpers/model';
import checkDrizzleResponse from 'shared/helpers/CheckDrizzleResponse';

interface IChildrenProps {
  orders: IPaymentOrder[];
  ordersLoading: boolean;
}

interface IOwnProps {
  tokenId: string;
  children(props: IChildrenProps): React.ReactNode;
}

type IProps = IOwnProps & InjectDrizzleProps;

interface IState {
  keyForOrderIds: string;
  orderIds: string[];
  keysForOrders: Array<{ key: string, id: string }>;
}

class WithOrders extends React.PureComponent<IProps, IState> {
  public state: IState = { orderIds: [], keyForOrderIds: '', keysForOrders: [] };

  public componentDidMount() {
    const { drizzle, tokenId } = this.props;
    const contract = drizzle.contracts[mainContractName];
    const keyForOrderIds = contract.methods.getOrdersList.cacheCall(tokenId.toString());
    this.setState({ keyForOrderIds });
  }
  public componentDidUpdate() {
    const { drizzleState } = this.props;
    const contract = drizzleState.contracts[mainContractName];
    const orderIdsResponse = contract.getOrdersList[this.state.keyForOrderIds];
    const orderIds = checkDrizzleResponse<string[], []>(orderIdsResponse, []);

    if (this.state.orderIds.length !== orderIds.length) {
      this.setState({ orderIds });
      this.updateOrders(orderIds);
    }
  }

  public render() {
    const { drizzleState, children } = this.props;
    const contract = drizzleState.contracts[mainContractName];
    const orders = this.state.keysForOrders.map(({ key, id }) => {
      const orderResponse = contract.getByOrderId[key];
      const order = checkDrizzleResponse<IBlockChainPaymentOrder, null>(orderResponse, null);
      return order ? convertOrderResponse(order, id) : null;
    });

    const orderIdsResponse = contract.getOrdersList[this.state.keyForOrderIds];
    const orderIds = checkDrizzleResponse<string[], null>(orderIdsResponse, null);
    const ordersLoading = !orderIds || orders.some(order => !order);

    return typeof children === 'function' ?
      children({ orders: orders.filter(order => order) as IPaymentOrder[], ordersLoading }) : '';
  }

  public updateOrders(orderIds: string[]) {
    const { drizzle, tokenId } = this.props;
    const contract = drizzle.contracts[mainContractName];
    const keysForOrders = orderIds.map(id => ({
      key: contract.methods.getByOrderId.cacheCall(tokenId.toString(), id),
      id,
    }));
    this.setState({ keysForOrders });
  }
}

function convertOrderResponse(order: IBlockChainPaymentOrder, id: string): IPaymentOrder {
  return {
    id: Number(id),
    subscriber: order.subscriber,
    pendingDatePayment: Number(order.pendingDatePayment) * 1000,
    datePayment: Number(order.datePayment) * 1000,
    amount: (new BigNumber(order.amount)).div(OneDAI),
    isPayed: order.isPayed,
    isDeleted: order.isDeleted,
  };
}

export default withDrizzle(WithOrders);
