import * as React from 'react';
import { BigNumber } from '0x.js';

import {
  GetContractTransactionType, TransactionRequestDataByType,
  ContractTransactionResponseDataByType, ContractTransactionDataByType,
} from 'shared/types/models';
import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';
import { OneDAI } from 'shared/helpers/model';
import { mainContractName } from 'shared/constants';

interface IChildrenProps<T extends GetContractTransactionType> {
  data: ContractTransactionDataByType[T] | null;
}

interface IOwnProps<T extends GetContractTransactionType> {
  type: T;
  request: TransactionRequestDataByType[T];
  children?(props: IChildrenProps<T>): React.ReactNode;
}

type IProps = IOwnProps<GetContractTransactionType> & InjectDrizzleProps;

interface IState {
  dataKey: string;
}

class ShowMainContractData extends React.PureComponent<IProps, IState> {
  public state: IState = { dataKey: '' };

  public componentDidMount() {
    this.updateData();
  }

  public componentDidUpdate(prevProps: IProps) {
    const { type } = this.props;
    if (prevProps.type !== type) {
      this.updateData();
    }
  }

  public render() {
    const { drizzleState, type, request, children } = this.props;
    const contract = drizzleState.contracts[mainContractName];
    const account = drizzleState.accounts[0];

    const fullResponse = contract[type][this.state.dataKey];
    const response = fullResponse && fullResponse.value !== undefined && fullResponse.value || null;
    const data = response && (convertResponseByType[type] as ResponseConverter)(response, request, account);
    return typeof children === 'function' ? children({ data }) : response.toString();
  }

  private updateData() {
    const { drizzle, drizzleState, type, request } = this.props;
    const contract = drizzle.contracts[mainContractName];
    const account = drizzleState.accounts[0];

    const params = (getParamsByRequest[type] as ParamsConverter)(request, account);

    const dataKey = contract.methods[type].cacheCall(...params);

    this.setState({ dataKey });
  }
}

type ParamsConverter<T extends GetContractTransactionType = GetContractTransactionType> =
  (request: TransactionRequestDataByType[T], account: string) => string[];

const getParamsByRequest: { [key in GetContractTransactionType]: ParamsConverter<key> } = {
  isMinter: (data, account) => [data.address || account],
  ownerOf: (data) => [data.tokenId.toString()],
  cashflowFor: (data) => [data.tokenId.toString()],
  idsOfCashflowsFor: (data, account) => [data.address || account],
  idsOfSubscribedCashflowsFor: (data, account) => [data.address || account],
};

type ResponseConverter<T extends GetContractTransactionType = GetContractTransactionType> =
  (response: ContractTransactionResponseDataByType[T], request: TransactionRequestDataByType[T], account: string) =>
    ContractTransactionDataByType[T];

const convertResponseByType: { [key in GetContractTransactionType]: ResponseConverter<key> } = {
  isMinter: response => response,
  ownerOf: response => response,
  // TODO ds: add memoize
  cashflowFor: (response, request, account) => {
    const amount = new BigNumber(response.value).div(OneDAI);
    const balance = new BigNumber(response.balance).div(OneDAI);
    const instalmentSize = new BigNumber(response.commit).div(OneDAI);
    const instalmentCount = amount.div(instalmentSize).toNumber();
    const duration = Number(response.duration) * 1000;
    const periodDuration = duration / instalmentCount;
    const createdAt = Number(response.created) * 1000;

    return {
      amount,
      balance,
      createdAt,
      duration,
      id: request.tokenId,
      instalmentSize,
      interestRate: Number(response.interestRate),
      lastPaymentDate: Number(response.lastPayment) * 1000,
      name: response.name,
      payer: response.publisher,

      isCreatedByMe: response.publisher.toLowerCase() === account.toLowerCase(),
      instalmentCount,
      periodDuration,
      firstInstalmentDate: createdAt + periodDuration,
      lastInstalmentDate: createdAt + duration,
    };
  },
  idsOfCashflowsFor: response => response.map(Number),
  idsOfSubscribedCashflowsFor: response => response.map(Number),
};

const Container = withDrizzle(ShowMainContractData);

function ShowMainContractDataGeneric<T extends GetContractTransactionType>(props: IOwnProps<T>) {
  return <Container {...props} />;
}

export default ShowMainContractDataGeneric;
