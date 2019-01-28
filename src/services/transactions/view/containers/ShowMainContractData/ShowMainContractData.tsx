import * as React from 'react';
import { SubSet } from '_helpers';

import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';
import { mainContractName } from 'shared/constants';

type Type = 'ownerOf' | 'totalSupply' | 'tokenByIndex';

type DataByType = SubSet<Record<Type, any>, {
  ownerOf: { tokenId: number };
  totalSupply: null;
  tokenByIndex: { index: number }
}>;

type Request = {
  [key in Type]: {
    type: key;
    data: DataByType[key];
  };
}[Type];

interface IProps<T extends Type> {
  type: T;
  data: DataByType[T];
}

interface IState {
  dataKey: string;
}

class ShowMainContractData<T extends Type> extends React.PureComponent<IProps<T> & InjectDrizzleProps, IState> {
  public state: IState = { dataKey: '' };

  public componentDidMount() {
    const { drizzle, type, data } = this.props;
    const contract = drizzle.contracts[mainContractName];

    const params = getParamsByRequest({ type, data } as Request);

    const dataKey = contract.methods[type].cacheCall(...params);

    this.setState({ dataKey });
  }

  public render() {
    const { drizzleState, type } = this.props;
    const contract = drizzleState.contracts[mainContractName];

    const data = contract[type][this.state.dataKey];
    return data && data.value || null;
  }
}

function getParamsByRequest(request: Request): string[] {
  switch (request.type) {
    case 'ownerOf': return [request.data.tokenId.toString()];
    case 'tokenByIndex': return [request.data.index.toString()];
    case 'totalSupply': return [];
    default: return [];
  }
}

const Container = withDrizzle(ShowMainContractData);

function ShowMainContractDataGeneric<T extends Type>(props: IProps<T>) {
  return <Container {...props} />;
}

export default ShowMainContractDataGeneric;
