import * as React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { GetProps, Omit } from '_helpers';

import { SetTransactionType, TransactionDataByType, SetTransactionRequest } from 'shared/types/models';
import { Button } from 'shared/view/elements';

import * as actions from './../../../redux/actions';

type IOwnProps<T extends SetTransactionType> = Omit<GetProps<typeof Button>, 'type'> & {
  type: T;
  data: TransactionDataByType[T];
};

type IActionProps = typeof mapDispatch;

type IProps = IActionProps & IOwnProps<SetTransactionType>;

const mapDispatch = {
  sendTransaction: actions.sendTransaction,
};

class SendTransactionButton extends React.PureComponent<IProps, {}> {
  public render() {
    const { type, data, sendTransaction, ...rest } = this.props;
    return (
      <Button {...rest} onClick={this.onClick} />
    );
  }

  @bind
  private onClick(event: React.MouseEvent<HTMLElement>) {
    const { type, data, sendTransaction, onClick } = this.props;
    sendTransaction({ type, data } as SetTransactionRequest);
    onClick && onClick(event);
  }
}

const Connected = connect(null, mapDispatch)(SendTransactionButton);
function SendTransactionButtonGeneric<T extends SetTransactionType>(props: IOwnProps<T>) {
  return <Connected {...props} />;
}

export default SendTransactionButtonGeneric;
