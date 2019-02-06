import * as React from 'react';

import {
  GetPaymentOrderTransactionType, TransactionRequestDataByType,
  PaymentOrderTransactionResponseDataByType, PaymentOrderTransactionDataByType, IPaymentOrder,
} from 'shared/types/models';
import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';
import { OneDAI } from 'shared/helpers/model';
import { mainContractName } from 'shared/constants';

interface IChildrenProps<T extends GetPaymentOrderTransactionType> {
  data: PaymentOrderTransactionDataByType[T] | null;
}

interface IOwnProps<T extends GetPaymentOrderTransactionType> {
  tokenId: number;
  children?(props: IChildrenProps<T>): React.ReactNode;
}

type IProps = IOwnProps<GetPaymentOrderTransactionType> & InjectDrizzleProps;

interface IState {
  orderIdsKey: string;
  orderIds: string[];
  orderKeys: string[];
  orders: IPaymentOrder[];
}

class WithOrders extends React.PureComponent<IProps, IState> {
  public state: IState = { orderIds: [], orderIdsKey: '', orderKeys: [], orders: [] };

  public componentDidMount() {
    const { drizzle, tokenId } = this.props;
    const contract = drizzle.contracts[mainContractName];
    const orderIdsKey = contract.methods.getOrdersList.cacheCall(tokenId.toString());
    // const orderKey = contract.methods.getByOrderId.cacheCall(tokenId.toString(), '2');
    this.setState({ orderIdsKey });
  }
  public componentDidUpdate(_pProps: IProps, pState: IState) {
    const { drizzleState } = this.props;
    const contract = drizzleState.contracts[mainContractName];
    const fullResponse = contract.getOrdersList[this.state.orderIdsKey];
    const orderIds = fullResponse && fullResponse.value !== undefined && fullResponse.value || [];

    if (pState.orderIds.length !== pState.orderIds.length) {
      this.setState({ orderIds });


    }
  }

  public render() {
    const { drizzleState, children } = this.props;
    const contract = drizzleState.contracts[mainContractName];

    // if (contract.getOrdersList) {
    //   const fullResponse = contract.getOrdersList[this.state.orderIdsKey];
    //   const response = fullResponse && fullResponse.value !== undefined && fullResponse.value || null;
    //   console.log('orderIds', response);
    // }

    // if (contract.getByOrderId) {
    //   const fullResponse = contract.getByOrderId[this.state.orderKey];
    //   const response = fullResponse && fullResponse.value !== undefined && fullResponse.value || null;
    //   console.log('getByOrderId', response);
    // }

    // const data = response && (convertResponseByType[type] as ResponseConverter)(response, request);

    return typeof children === 'function' ? children({ data: this.state.orders }) : '';
  }

  public getOrders(orderIds: string[]) {
    const { drizzleState } = this.props;
    const contract = drizzleState.contracts[mainContractName];

    const orders = orderIds.map(id => {
      const fullResponse = contract.getByOrderId[id];
      const response = fullResponse && fullResponse.value !== undefined && fullResponse.value || null;

      return response;
    });

    return orders;
  }
}

// type ParamsConverter<T extends GetPaymentOrderTransactionType = GetPaymentOrderTransactionType> =
//   (request: TransactionRequestDataByType[T], account: string) => string[];

// type ResponseConverter<T extends GetPaymentOrderTransactionType = GetPaymentOrderTransactionType> =
//   (response: PaymentOrderTransactionResponseDataByType[T], request: TransactionRequestDataByType[T]) =>
//     PaymentOrderTransactionDataByType[T];

// const convertResponseByType: { [key in GetPaymentOrderTransactionType]: ResponseConverter<key> } = {
//   getOrdersList: response => response.map(Number),
//   getByOrderId: (response) => response as any,
// };

const Container = withDrizzle(WithOrders);

function WithOrdersGeneric<T extends GetPaymentOrderTransactionType>(props: IOwnProps<T>) {
  return <Container {...props} />;
}

export default WithOrdersGeneric;
