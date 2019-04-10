import * as React from 'react';
import { withDrizzle, InjectDrizzleProps } from 'shared/helpers/react';
import { IAppReduxState } from 'shared/types/app';

import { selectors } from './../../../redux';
import { connect } from 'react-redux';

interface IChildrenProps {
  status: 'initial' | 'pending' | 'success' | 'error';
}

interface IOwnProps {
  uuid: string;
  onSuccess?(): void;
  onFail?(): void;
  children?(props: IChildrenProps): React.ReactNode;
}

interface IStateProps {
  txHashMap: Record<string, string>;
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    txHashMap: selectors.selectTxHashMap(state),
  };
}

type IProps = IStateProps & IOwnProps & InjectDrizzleProps;

class TransactionListener extends React.PureComponent<IProps, {}> {
  public componentDidUpdate(prevProps: IProps) {
    const { onSuccess, onFail } = this.props;
    const status = this.getTransactionStatus(this.props);
    const prevStatus = this.getTransactionStatus(prevProps);

    if (prevStatus === 'pending' && status === 'success') {
      onSuccess && onSuccess();
    }
    if (prevStatus === 'pending' && status !== 'success' && status !== 'pending') {
      onFail && onFail();
    }
  }

  public render() {
    const { children } = this.props;
    if (!children) { return null; }
    const status = this.getTransactionStatus(this.props) as IChildrenProps['status'];
    return children({ status });
  }

  private getTransactionStatus(props: IProps): string {
    const { txHashMap, drizzleState, uuid } = props;
    const txHash = txHashMap[uuid];
    if (!txHash) { return 'initial'; }

    return drizzleState.transactions[txHash].status;
  }
}

export default connect(mapState)(withDrizzle(TransactionListener));
