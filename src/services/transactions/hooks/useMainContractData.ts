import * as React from 'react';
import { BigNumber } from '0x.js';

import {
  GetContractTransactionType, TransactionRequestDataByType,
  ContractTransactionResponseDataByType, ContractTransactionDataByType,
} from 'shared/types/models';
import { useDrizzle } from 'shared/helpers/react';
import { OneDAI } from 'shared/model/calculate';
import { mainContractName } from 'shared/constants';

interface InjectProps<T extends GetContractTransactionType> {
  data: ContractTransactionDataByType[T] | null;
}

export default function useMainContractData<T extends GetContractTransactionType>(
  type: T,
  request: TransactionRequestDataByType[T],
): InjectProps<T> {
  const { drizzle, drizzleState } = useDrizzle();
  const [dataKey, setDataKey] = React.useState('');

  const contract = drizzle.contracts[mainContractName];
  const account = drizzleState.accounts[0];

  React.useEffect(() => {
    const params = (getParamsByRequest[type] as ParamsConverter)(request, account);
    const nextDataKey = contract.methods[type].cacheCall(...params);
    setDataKey(nextDataKey);
  }, [type, account]);

  const contractState = drizzleState.contracts[mainContractName];

  const fullResponse = contractState[type][dataKey];
  const response = fullResponse && fullResponse.value !== undefined && fullResponse.value || null;
  const data = response && (convertResponseByType[type] as ResponseConverter)(response, request, account);

  return { data };
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
  idsOfCashflowsFor: response => response,
  idsOfSubscribedCashflowsFor: response => response,
};
