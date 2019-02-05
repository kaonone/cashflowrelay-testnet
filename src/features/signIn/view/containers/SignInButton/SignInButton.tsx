import * as React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { DrizzleContext } from 'drizzle-react';
import { GetProps } from '_helpers';

import { ITranslateProps, i18nConnect } from 'services/i18n';

import { IAppReduxState } from 'shared/types/app';
import { ICommunication } from 'shared/types/redux';
import { Button } from 'shared/view/elements';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import ConfirmSignInModal from '../../components/ConfirmSignInModal/ConfirmSignInModal';

interface IStateProps {
  signing: ICommunication;
}

type IActionProps = typeof mapDispatch;

interface IState {
  isOpenedModal: boolean;
}

type IProps = IStateProps & IActionProps & ITranslateProps & GetProps<typeof Button>;

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
    const { t, locale, signing, signIn, children, ...restProps } = this.props;
    const { isOpenedModal } = this.state;
    return (
      <DrizzleContext.Consumer>
        {({ drizzleState }) => {
          const address = drizzleState.accounts[0];
          return (<>
            <Button variant="outlined" color="primary" {...restProps} onClick={this.onButtonClick}>
              {children}
            </Button>
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
    i18nConnect(SignInButton),
  )
);
