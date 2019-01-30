import * as React from 'react';

import { GetTransactionType, TransactionDataByType } from 'shared/types/models';
import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';
import { mainContractName } from 'shared/constants';

interface IOwnProps<T extends GetTransactionType> {
  type: T;
  data: TransactionDataByType[T];
}

type IProps = IOwnProps<GetTransactionType> & InjectDrizzleProps;

interface IState {
  dataKey: string;
}

class ShowMainContractData extends React.PureComponent<IProps, IState> {
  public state: IState = { dataKey: '' };

  public componentDidMount() {
    const { drizzle, type, data } = this.props;
    const contract = drizzle.contracts[mainContractName];

    const params = (getParamsByRequest[type] as ParamsConverter)(data);

    const dataKey = contract.methods[type].cacheCall(...params);

    this.setState({ dataKey });
  }

  public render() {
    const { drizzleState, type } = this.props;
    const contract = drizzleState.contracts[mainContractName];

    const data = contract[type][this.state.dataKey];
    return data && data.value !== undefined && data.value.toString() || null;
  }
}

type ParamsConverter<T extends GetTransactionType = GetTransactionType> =
  (data: TransactionDataByType[T]) => string[];

const getParamsByRequest: { [key in GetTransactionType]: ParamsConverter<key> } = {
  isMinter: (data) => [data.address.toString()],
  ownerOf: (data) => [data.tokenId.toString()],
  tokenByIndex: (data) => [data.index.toString()],
  totalSupply: () => [],
};

const Container = withDrizzle(ShowMainContractData);

function ShowMainContractDataGeneric<T extends GetTransactionType>(props: IOwnProps<T>) {
  return <Container {...props} />;
}

export default ShowMainContractDataGeneric;
