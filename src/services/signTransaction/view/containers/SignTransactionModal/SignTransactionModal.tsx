import * as React from 'react';
import { connect } from 'react-redux';

import { IAppReduxState } from 'shared/types/app';
import { Modal } from 'shared/view/components';

import * as selectors from '../../../redux/selectors';
import { stopTransactionListening } from '../../../redux/actions';
import SignTransaction from '../SignTransaction/SignTransaction';

interface IStateProps {
  isOpened: boolean;
}

type IActionsProps = typeof mapDispatch;

type IProps = IStateProps & IActionsProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    isOpened: selectors.selectIsOpenedModal(state),
  };
}

const mapDispatch = {
  onClose: stopTransactionListening,
};

function SignTransactionModal(props: IProps) {
  const { onClose, isOpened, ...restProps } = props;
  return (
    <Modal size="large" type="signTransaction" onClose={onClose} isOpen={isOpened}>
      <SignTransaction {...restProps} />
    </Modal>
  );
}

export { IProps };
export default connect(mapState, mapDispatch)(SignTransactionModal);
