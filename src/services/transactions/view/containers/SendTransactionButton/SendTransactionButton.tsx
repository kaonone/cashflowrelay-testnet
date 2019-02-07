import * as React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import * as makeUuid from 'uuid';
import { GetProps, Omit } from '_helpers';

import { SetTransactionType, TransactionRequestDataByType, SetTransactionRequest } from 'shared/types/models';
import { Button } from 'shared/view/elements';

import { actions } from './../../../redux';
import TransactionListener from '../TransactionListener/TransactionListener';

type IOwnProps<T extends SetTransactionType> = Omit<GetProps<typeof Button>, 'type'> & {
  type: T;
  data: TransactionRequestDataByType[T];
  onSuccess?(): void;
  onFail?(): void;
};

type IActionProps = typeof mapDispatch;

type IProps = IActionProps & IOwnProps<SetTransactionType>;

const mapDispatch = {
  sendTransaction: actions.sendTransaction,
};

class SendTransactionButton extends React.PureComponent<IProps, {}> {
  private uuid = makeUuid();

  public render() {
    const { type, data, sendTransaction, ...rest } = this.props;
    return (
      <>
        <Button {...rest} onClick={this.onClick} />
        <TransactionListener uuid={this.uuid} onSuccess={this.onSuccess} onFail={this.onFail} />
      </>
    );
  }

  @bind
  private onClick(event: React.MouseEvent<HTMLElement>) {
    const { type, data, sendTransaction, onClick } = this.props;
    sendTransaction({ type, data } as SetTransactionRequest, this.uuid);
    onClick && onClick(event);
  }

  @bind
  private onSuccess() {
    this.props.onSuccess && this.props.onSuccess();
    this.uuid = makeUuid();
  }

  @bind
  private onFail() {
    this.props.onFail && this.props.onFail();
    this.uuid = makeUuid();
  }
}

const Connected = connect(null, mapDispatch)(SendTransactionButton);
function SendTransactionButtonGeneric<T extends SetTransactionType>(props: IOwnProps<T>) {
  return <Connected {...props} />;
}

export default SendTransactionButtonGeneric;
