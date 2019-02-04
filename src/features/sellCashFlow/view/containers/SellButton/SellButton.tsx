import * as React from 'react';
import { bind } from 'decko';
import { connect } from 'react-redux';
import { BigNumber } from '0x.js';

import { ITranslateProps, i18nConnect } from 'services/i18n';
import { IAppReduxState } from 'shared/types/app';
import { IToken } from 'shared/types/models';
import { ICommunication } from 'shared/types/redux';
import { CashFlowInfo, SellingPriceField } from 'shared/view/model';
import { DrawerModal } from 'shared/view/components';
import { Button, CircleProgressBar } from 'shared/view/elements';

import * as actions from './../../../redux/actions';
import * as selectors from './../../../redux/selectors';
import { StylesProps, provideStyles } from './SellButton.style';

interface IOwnProps {
  cashflow: IToken;
  disabled?: boolean;
}

interface IStateProps {
  selling: ICommunication;
}

type IActionProps = typeof mapDispatch;

interface IState {
  isOpenSellModal: boolean;
  price: number;
}

type IProps = IStateProps & IActionProps & IOwnProps & StylesProps & ITranslateProps;

function mapState(state: IAppReduxState): IStateProps {
  return {
    selling: selectors.selectCommunication(state, 'selling'),
  };
}

const mapDispatch = {
  sell: actions.sell,
};

class SellButton extends React.PureComponent<IProps, IState> {
  public state: IState = {
    isOpenSellModal: false,
    price: this.calcRecommendedPrice().def,
  };

  public componentDidUpdate(prevProps: IProps) {
    if (prevProps.selling.isRequesting && !this.props.selling.isRequesting) {
      this.closeModal();
    }
  }

  public render() {
    const { cashflow, disabled, selling, classes } = this.props;
    const { isOpenSellModal, price } = this.state;
    const recommendedAmount = this.calcRecommendedPrice();
    return (
      <>
        <Button variant="contained" color="primary" onClick={this.openModal} disabled={disabled}>Sell cashflow</Button>
        <DrawerModal
          open={isOpenSellModal}
          title={cashflow.name}
          onClose={this.closeModal}
          actions={[(
            <Button
              variant="contained"
              color="primary"
              key=""
              fullWidth
              onClick={this.onConfirm}
              disabled={selling.isRequesting}
            >
              Sell cashflow
              {selling.isRequesting && <div className={classes.preloader}><CircleProgressBar size={22} /></div>}
            </Button>
          )]}
        >
          <>
            <SellingPriceField
              sellPrice={price}
              onChangeSellPrice={this.changePrice}
            />
            <CashFlowInfo
              recommendedPrice={`${recommendedAmount.min} - ${recommendedAmount.max} DAI`}
              token={cashflow}
              fields={['instalmentSize', 'duration', 'firstInstalmentDate', 'lastInstalmentDate']}
            />
          </>
        </DrawerModal>
      </>
    );
  }

  @bind
  private onConfirm() {
    const { sell, cashflow } = this.props;
    const { price } = this.state;
    sell({ cashflow, price });
  }

  @bind
  private calcRecommendedPrice(): { min: number, def: number, max: number } {
    const { amount, interestRate } = this.props.cashflow;
    const percent = new BigNumber(interestRate).div(100);
    const delta = percent.div(3);

    const def = amount.div(new BigNumber(1).plus(percent)).ceil();
    const min = def.times(new BigNumber(1).minus(delta)).ceil();
    const max = def.times(new BigNumber(1).plus(delta)).ceil();
    return {
      def: def.toNumber(),
      min: min.toNumber(),
      max: max.toNumber(),
    };
  }

  @bind
  private openModal() {
    this.setState({ isOpenSellModal: true });
  }

  @bind
  private closeModal() {
    this.setState({ isOpenSellModal: false });
  }

  @bind
  private changePrice(price: number) {
    this.setState({ price });
  }
}

export { SellButton };
export default (
  connect(mapState, mapDispatch)(
    i18nConnect(provideStyles(SellButton)),
  )
);
