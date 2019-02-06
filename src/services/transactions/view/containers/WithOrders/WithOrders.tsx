import * as React from 'react';
import BigNumber from 'bignumber.js';

import {
  GetPaymentOrderTransactionType, TransactionRequestDataByType,
  PaymentOrderTransactionResponseDataByType, PaymentOrderTransactionDataByType,
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
}

class WithOrders extends React.PureComponent<IProps, IState> {
  public state: IState = { orderIdsKey: '' };

  public componentDidMount() {
    const { drizzle, drizzleState, tokenId } = this.props;
    const contract = drizzle.contracts[mainContractName];
    debugger;
    // const dataKey = contract.methods.getOrdersList.cacheCall();
    debugger;
    const dataKey1 = contract.methods.executePayment.cacheSend([tokenId.toString(), '10000000']);
    debugger;
    const dataKey2 = contract.methods.createOrder.cacheSend([tokenId.toString(), '10000000']);
    debugger;
    this.setState({ orderIdsKey: dataKey });
  }
  public componentDidUpdate() {
    // const { drizzleState } = this.props;
    // const contract = drizzleState.contracts[mainContractName];
    // const fullResponse = contract.getOrdersList[this.state.orderIdsKey];
    // const orderIds = fullResponse && fullResponse.value !== undefined && fullResponse.value || null;

    // if(this.state.)
  }

  public render() {
    const { drizzleState, children } = this.props;
    const contract = drizzleState.contracts[mainContractName];
    debugger;
    if (contract.getOrdersList) {
      const fullResponse = contract.getOrdersList[this.state.orderIdsKey];
      const response = fullResponse && fullResponse.value !== undefined && fullResponse.value || null;
      debugger;
    }

    // const data = response && (convertResponseByType[type] as ResponseConverter)(response, request);

    return children({ data: 'response' });
  }
}

type ParamsConverter<T extends GetPaymentOrderTransactionType = GetPaymentOrderTransactionType> =
  (request: TransactionRequestDataByType[T], account: string) => string[];

type ResponseConverter<T extends GetPaymentOrderTransactionType = GetPaymentOrderTransactionType> =
  (response: PaymentOrderTransactionResponseDataByType[T], request: TransactionRequestDataByType[T]) =>
    PaymentOrderTransactionDataByType[T];

const convertResponseByType: { [key in GetPaymentOrderTransactionType]: ResponseConverter<key> } = {
  getOrdersList: response => response.map(Number),
  getByOrderId: (response) => response,
};

const Container = withDrizzle(WithOrders);

function WithOrdersGeneric<T extends GetPaymentOrderTransactionType>(props: IOwnProps<T>) {
  return <Container {...props} />;
}

export default WithOrdersGeneric;
