import * as React from 'react';
import { Drizzle } from 'drizzle';
import { InjectDrizzleProps } from 'drizzle-react';
import { withDrizzle } from 'shared/helpers/react';

interface IOwnProps {
  errorComp?: React.ReactNode;
  loadingComp?: React.ReactNode;
  children: React.ReactNode;
  onInitialize(drizzle: Drizzle): void;
}

type IProps = IOwnProps & InjectDrizzleProps;

class LoadingContainer extends React.Component<IProps> {
  public componentDidUpdate(prevProps: IProps) {
    const { initialized, drizzle, onInitialize } = this.props;
    if (!prevProps.initialized && initialized) {
      onInitialize(drizzle);
    }
  }

  public render() {
    const { drizzleState, initialized } = this.props;

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

    const isEmptyAccounts: boolean = (
      drizzleState &&
      drizzleState.web3.status === 'initialized' &&
      Object.keys(drizzleState.accounts).length === 0
    );

    if (isEmptyAccounts) {
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

    if (initialized) {
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
}

export default withDrizzle(LoadingContainer);
