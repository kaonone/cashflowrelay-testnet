import * as React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { selectors as userSelectors } from 'services/user';
import { IAppReduxState } from 'shared/types/app';
import { IToken, IOrder } from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import { CashFlowInfo } from 'shared/view/model';
import { DrawerModal } from 'shared/view/components';
import { Button, CircleProgressBar } from 'shared/view/elements';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import { StylesProps, provideStyles } from './BuyButton.style';
import { isSucceededByState } from 'shared/helpers/redux';

interface IOwnProps {
  order: IOrder;
  cashflow: IToken;
  disabled?: boolean;
  onSuccess?(): void;
}

interface IStateProps {
  buying: ICommunication;
  isLogged: boolean;
}

type IActionProps = typeof mapDispatch;

interface IState {
  isOpenBuyModal: boolean;
}

type IProps = IStateProps & IActionProps & IOwnProps & StylesProps & ITranslateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    buying: selectors.selectCommunication(state, 'buying'),
    isLogged: userSelectors.selectIsLogged(state),
  };
}

const mapDispatch = {
  buy: actions.buy,
};

class BuyButton extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isOpenBuyModal: false,
  };

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.buying.isRequesting && !this.props.buying.isRequesting) {
      this.closeModal();
    }
    if (isSucceededByState(prevProps.buying, this.props.buying)) {
      this.props.onSuccess && this.props.onSuccess();
    }
  }

  public render() {
    const { order, cashflow, isLogged, buying, classes } = this.props;
    const { isOpenBuyModal } = this.state;

    const disabled = this.props.disabled || !isLogged;

    return (
      <>
        <Button variant="contained" color="primary" onClick={this.openModal} disabled={disabled}>
          Buy cashflow
        </Button>
        <DrawerModal
          open={isOpenBuyModal}
          title={cashflow.name}
          onClose={this.closeModal}
          actions={[(
            <Button
              variant="contained"
              color="primary"
              key=""
              fullWidth
              onClick={this.onConfirm}
              disabled={buying.isRequesting}
            >
              Buy cashflow
              {buying.isRequesting && <div className={classes.preloader}><CircleProgressBar size={22} /></div>}
            </Button>
          )]}
        >
          <CashFlowInfo
            token={cashflow}
            price={order.price.toNumber()}
            fields={['amount', 'instalmentSize', 'stakeSize', 'duration', 'firstInstalmentDate', 'lastInstalmentDate']}
          />
        </DrawerModal>
      </>
    );
  }

  @bind
  private onConfirm() {
    const { buy, order } = this.props;
    buy(order);
  }

  @bind
  private openModal() {
    this.setState({ isOpenBuyModal: true });
  }

  @bind
  private closeModal() {
    this.setState({ isOpenBuyModal: false });
  }
}

export { BuyButton };
export default (
  connect(mapState, mapDispatch)(
    i18nConnect(provideStyles(BuyButton)),
  )
);
