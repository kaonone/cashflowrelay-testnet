import * as React from 'react';
import { Drizzle } from 'drizzle';
import { InjectDrizzleProps } from 'drizzle-react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';

import { withDrizzle } from 'shared/helpers/react';
import { actions as userActions, selectors as userSelectors } from 'services/user';
import { IAppReduxState } from 'shared/types/app';

interface IOwnProps {
  errorComp?: React.ReactNode;
  loadingComp?: React.ReactNode;
  children: React.ReactNode;
  onDrizzleInitialize?(drizzle: Drizzle): void;
}

interface IStateProps {
  isChecked: boolean;
}

type ActionProps = typeof mapDispatch;

type IProps = IOwnProps & ActionProps & IStateProps & InjectDrizzleProps & RouteComponentProps;

class LoadingContainer extends React.Component<IProps> {

  public componentDidUpdate(prevProps: IProps) {
    const { initialized, drizzle, onDrizzleInitialize, checkIsUserSigned, drizzleState } = this.props;

    if (!prevProps.initialized && initialized) {
      !this.isEmptyAccounts() && drizzleState.web3.status !== 'failed' && checkIsUserSigned();
      onDrizzleInitialize && onDrizzleInitialize(drizzle);
    }
  }
  public render() {
    const { drizzleState, initialized, isChecked } = this.props;

    if (drizzleState && drizzleState.web3.status === 'failed') {
      if (this.props.errorComp) {
        return this.props.errorComp;
      }

      return (
        <main className="container loading-screen">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>⚠️</h1>
              <p>{[
                'This browser has no connection to the Ethereum network.',
                'Please use the Chrome/FireFox extension MetaMask,',
                'or dedicated Ethereum browsers Mist or Parity.',
              ].join(' ')}</p>
            </div>
          </div>
        </main>
      );
    }

    if (this.isEmptyAccounts()) {
      return (
        <main className="container loading-screen">
          <div className="pure-g">
            <div className="pure-u-1-1">
              <h1>🦊</h1>
              <p>{[
                'We can\'t find any Ethereum accounts! Please check and make sure Metamask or your browser',
                'are pointed at the correct network and your account is unlocked.',
              ].join(' ')}</p>
            </div>
          </div>
        </main>
      );
    }

    if (initialized && isChecked) {
      return this.props.children;
    }

    if (this.props.loadingComp) {
      return this.props.loadingComp;
    }

    return (
      <main className="container loading-screen">
        <div className="pure-g">
          <div className="pure-u-1-1">
            <h1>⚙️</h1>
            <p>Loading dapp...</p>
          </div>
        </div>
      </main>
    );
  }

  private isEmptyAccounts() {
    const { drizzleState } = this.props;
    return drizzleState &&
      drizzleState.web3.status === 'initialized' &&
      Object.keys(drizzleState.accounts).length === 0;
  }
}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isChecked: userSelectors.selectIsChecked(state),
  };
}

const mapDispatch = {
  checkIsUserSigned: userActions.checkIsUserSigned,
};

export default withDrizzle(withRouter(connect(mapState, mapDispatch)(LoadingContainer)));
