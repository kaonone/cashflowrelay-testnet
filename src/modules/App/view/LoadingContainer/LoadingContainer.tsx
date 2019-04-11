import * as React from 'react';
import { Drizzle } from 'drizzle';
import { InjectDrizzleProps } from 'drizzle-react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import { NETWORK_CONFIG } from 'core/constants';

import { withDrizzle } from 'shared/helpers/react';
import { actions as userActions, selectors as userSelectors } from 'services/user';
import { IAppReduxState } from 'shared/types/app';
import { i18nConnect, ITranslateProps, tKeys } from 'services/i18n';
import { GlobalLoader } from 'shared/view/elements';

import RetryModal from '../RetryModal/RetryModal';

interface IState {
  isUnsupportedNetwork: boolean;
  isCheckedNetwork: boolean;
}

interface IOwnProps {
  errorComp?: React.ReactNode;
  loadingComp?: React.ReactNode;
  children: React.ReactNode;
  onDrizzleInitialize?(drizzle: Drizzle): void;
}

interface IStateProps {
  isCheckedAuth: boolean;
  isLogged: boolean;
}

type ActionProps = typeof mapDispatch;

type IProps = IOwnProps & ActionProps & IStateProps & InjectDrizzleProps & RouteComponentProps & ITranslateProps;

class LoadingContainer extends React.Component<IProps, IState> {
  public state: IState = { isUnsupportedNetwork: false, isCheckedNetwork: false };
  public componentDidUpdate(prevProps: IProps) {
    const {
      initialized, drizzle, drizzleState, isLogged,
      onDrizzleInitialize, checkIsUserSigned, checkUserPermissions,
    } = this.props;

    if (!prevProps.initialized && initialized) {
      !this.isEmptyAccounts() && drizzleState.web3.status !== 'failed' && checkIsUserSigned();
      onDrizzleInitialize && onDrizzleInitialize(drizzle);
    }

    if (!prevProps.isLogged && isLogged) {
      checkUserPermissions();
    }

    if (
      (!prevProps.drizzleState && drizzleState && drizzleState.web3.networkId) ||
      (prevProps.drizzleState && !prevProps.drizzleState.web3.networkId && drizzleState.web3.networkId)
    ) {
      this.setState({ isCheckedNetwork: true });
      drizzleState.web3.networkId !== NETWORK_CONFIG.id && this.setState({ isUnsupportedNetwork: true });
    }
  }
  public render() {
    const { drizzleState, initialized, isCheckedAuth, t } = this.props;
    const { isCheckedNetwork, isUnsupportedNetwork } = this.state;
    if (drizzleState && drizzleState.web3.status === 'failed') {
      return (
        <RetryModal isOpen={true} onRetry={this.reloadPage}>
          {t(tKeys.shared.needUseMetamask.getKey())}
        </RetryModal>
      );
    }

    if (this.isEmptyAccounts() || isUnsupportedNetwork) {
      return (
        <RetryModal isOpen={true} onRetry={this.reloadPage}>
          {t(tKeys.shared.noEthereumAccounts.getKey())}
        </RetryModal>
      );
    }

    if (initialized && isCheckedAuth && isCheckedNetwork) {
      return this.props.children;
    }

    if (this.props.loadingComp) {
      return this.props.loadingComp;
    }

    return <GlobalLoader />;
  }

  private isEmptyAccounts() {
    const { drizzleState } = this.props;
    return drizzleState &&
      drizzleState.web3.status === 'initialized' &&
      Object.keys(drizzleState.accounts).length === 0;
  }

  private reloadPage() {
    location.reload();
  }

}

function mapState(state: IAppReduxState): IStateProps {
  return {
    isCheckedAuth: userSelectors.selectIsCheckedAuth(state),
    isLogged: userSelectors.selectIsLogged(state),
  };
}

const mapDispatch = {
  checkIsUserSigned: userActions.checkIsUserSigned,
  checkUserPermissions: userActions.checkPermissions,
};

export default withDrizzle(
  withRouter(
    i18nConnect(
      connect(mapState, mapDispatch)(LoadingContainer),
    ),
  ),
);
