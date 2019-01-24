import * as React from 'react';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';
import { ITransaction } from 'shared/types/models';

import * as actions from '../../../redux/actions';
import * as selectors from '../../../redux/selectors';

type IChildrenProps = IState & IActionProps & {
  signedTransaction: ITransaction | null;
};

interface IOwnProps {
  children(props: IChildrenProps): React.ReactNode;
  onSuccess?(transaction: ITransaction): void;
  onCancel?(): void;
}

interface IStateProps {
  isOpenedModal: boolean;
  signedTransaction: ITransaction | null;
}

type IActionProps = typeof mapDispatch;

type IProps = IOwnProps & IStateProps & IActionProps;

type Status = 'initial' | 'signing';

interface IState {
  status: Status;
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isOpenedModal: selectors.selectIsOpenedModal(state),
    signedTransaction: selectors.selectSignedTransaction(state),
  };
}

const mapDispatch = {
  signTransaction: actions.signTransaction,
};

class WithSignTransaction extends React.Component<IProps, IState> {
  public state: IState = { status: 'initial' };

  public componentDidUpdate(prevProps: IProps) {
    const { signedTransaction, onSuccess, onCancel: onClose, isOpenedModal } = this.props;
    if (this.state.status === 'signing' && !prevProps.signedTransaction && signedTransaction) {
      onSuccess && onSuccess(signedTransaction);
    }
    if (this.state.status === 'signing' && prevProps.isOpenedModal && !isOpenedModal) {
      this.setState({ status: 'initial' });
      onClose && !signedTransaction && onClose();
    }
  }

  public render() {
    const childProps: IChildrenProps = {
      signedTransaction: this.props.signedTransaction,
      status: this.state.status,
      signTransaction: this.onSign,
    };
    return this.props.children(childProps);
  }

  private onSign: IProps['signTransaction'] = (type, data) => {
    this.setState({ status: 'signing' });
    return this.props.signTransaction(type, data);
  }
}

export { IProps, IOwnProps };
export default (
  connect(mapState, mapDispatch)(
    WithSignTransaction,
  )
);
