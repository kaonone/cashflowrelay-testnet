import * as React from 'react';
import { GetProps, Omit } from '_helpers';

import { TransactionType, ABIRequestDataByType, ITransaction } from 'shared/types/models';
import { Button } from 'shared/view/elements';

import WithSignTransaction from '../WithSignTransaction/WithSignTransaction';

interface IOwnProps<T extends TransactionType> {
  transactionType: T;
  data: ABIRequestDataByType[T];
  onSuccess?(transaction: ITransaction): void;
  onCancel?(): void;
}

type IButtonProps = Omit<GetProps<typeof Button>, 'onClick'>;

type IProps<T extends TransactionType> = IOwnProps<T> & IButtonProps;

class SignTransactionButton<T extends TransactionType> extends React.Component<IProps<T>> {
  public render() {
    const { data, transactionType, onSuccess, onCancel, ...restProps } = this.props;
    return (
      <WithSignTransaction onCancel={onCancel} onSuccess={onSuccess}>
        {({ signTransaction }) => (
          <Button {...restProps} onClick={signTransaction.bind(null, transactionType, data)} />
        )}
      </WithSignTransaction>
    );
  }
}

export { IProps, IOwnProps };
export default SignTransactionButton;
