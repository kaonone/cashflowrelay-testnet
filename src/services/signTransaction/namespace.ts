import { ICommunication, IAction, IPlainFailAction, IPlainAction } from 'shared/types/redux';
import { ABIRequest, ITransaction } from 'shared/types/models';
import { signTransaction } from './redux/actions';

export interface IReduxState {
  communication: {
    abiGeneration: ICommunication;
  };
  data: {
    request: ABIRequest | null;
    abiUrl: string | null;
    signedTransaction: ITransaction | null;
  };
}

export interface IQRCodeData {
  abiUrl: string;
  uuid: string;
}

export type SignTransactionFunction = typeof signTransaction;

export type IGenerateABI = IAction<'SIGN_TRANSACTION:GENERATE_ABI', ABIRequest>;
export type IGenerateABISuccess = IAction<'SIGN_TRANSACTION:GENERATE_ABI_SUCCESS', { abi: string, uuid: string }>;
export type IGenerateABIFail = IPlainFailAction<'SIGN_TRANSACTION:GENERATE_ABI_FAIL'>;

export type ISignTransaction = IAction<'SIGN_TRANSACTION:SIGN_TRANSACTION', ABIRequest>;

export type IStopTransactionListening = IPlainAction<'SIGN_TRANSACTION:STOP_TRANSACTION_LISTENING'>;

export type ISaveSignedTransaction = IAction<'SIGN_TRANSACTION:SAVE_SIGNED_TRANSACTION', ITransaction>;

export type Action =
  | IGenerateABI | IGenerateABISuccess | IGenerateABIFail | ISignTransaction | IStopTransactionListening
  | ISaveSignedTransaction;
