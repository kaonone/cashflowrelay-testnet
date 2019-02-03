import * as React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { DrizzleContext } from 'drizzle-react';
import { GetProps } from '_helpers';

import { ITranslateProps, i18nConnect, tKeys } from 'services/i18n';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { Button } from 'shared/view/elements';
import { shortenString } from 'shared/helpers/format';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import ConfirmSignInModal from '../../components/ConfirmSignInModal/ConfirmSignInModal';

import { provideStyles, StylesProps } from './ConnectToMetamask.style';

interface IStateProps {
  signing: ICommunication;
}

type IActionProps = typeof mapDispatch;

interface IState {
  isOpenedModal: boolean;
}

type IProps = IStateProps & IActionProps & ITranslateProps & GetProps<typeof Button> & StylesProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    signing: selectors.selectCommunication(state, 'signing'),
  };
}

const mapDispatch = {
  signIn: actions.signIn,
};

class SignInButton extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isOpenedModal: false,
  };

  public render() {
    const { t, locale, signing, signIn, classes, ...restProps } = this.props;
    const { isOpenedModal } = this.state;
    return (
      <DrizzleContext.Consumer>
        {({ drizzleState }) => {
          const address = drizzleState.accounts[0];
          return (<>
            <div className={classes.root}>
              <div className={classes.header}>
                Connect a wallet
              </div>
              <div className={classes.content}>
                <div className={classes.description}>
                  Metamask allows Web 3.0 applications to interact with Etherium blockchain and leaves you in full control over every transaction
                  </div>
                <Button
                  className={classes.action}
                  fullWidth
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={this.onButtonClick}
                >
                  {t(tKeys.features.signIn.button.getKey(), { address: 'Metamask' })}
                </Button>
              </div>
            </div>
            <ConfirmSignInModal
              address={address}
              signing={signing}
              isOpen={isOpenedModal}
              onClose={this.onClose}
              onConfirm={this.onConfirm.bind(null, address)}
            />
          </>);
        }}
      </DrizzleContext.Consumer>
    );
  }

  @bind
  private onButtonClick() {
    this.setState({ isOpenedModal: true });
  }

  @bind
  private onClose() {
    this.setState({ isOpenedModal: false });
  }

  @bind
  private onConfirm(address: string) {
    this.props.signIn({ address });
  }
}

export { SignInButton };
export default (
  connect(mapState, mapDispatch)(
    provideStyles(i18nConnect(SignInButton)),
  )
);
