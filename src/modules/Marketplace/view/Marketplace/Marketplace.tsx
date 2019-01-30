import * as React from 'react';
import { bind } from 'decko';

import { BaseLayout } from 'modules/shared';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { TokensList } from 'features/manageCashFlow';
import { Button } from 'shared/view/elements';
import CashFlowModal from 'shared/view/drafts/CashFlowModal/CashFlowModal';
import { mockCashFlow } from 'shared/helpers/mocks';

const hintForCreation =
  'Borrowing money is a two-step process. First, a cashflow is created. Then, it’s placed on the markeplace for sale.';
type IProps = InjectedAuthRouterProps;

interface IState {
  modal: 'create' | 'borrow' | 'selling' | null;
}

class Marketplace extends React.PureComponent<IProps> {
  public state: IState = { modal: null };
  public render() {
    return (
      <BaseLayout>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
          <Button variant="contained" onClick={this.openModal.bind(this, 'create')}>OPEN CREATE MODAL</Button>
          <Button variant="contained" onClick={this.openModal.bind(this, 'borrow')}>OPEN BORROW MODAL</Button>
          <Button variant="contained" onClick={this.openModal.bind(this, 'selling')}>OPEN SELL MODAL</Button>
        </div>
        <CashFlowModal
          type="borrow"
          repayingAmount={2178}
          token={mockCashFlow}
          duration={7}
          open={this.state.modal === 'create'}
          onClose={this.closeModal}
          hint={hintForCreation}
          actions={
            [<Button variant="contained" color="primary" key="" fullWidth>Create cashflow</Button>]
          }
        />
        <CashFlowModal
          type="borrow"
          repayingAmount={2178}
          token={mockCashFlow}
          duration={7}
          open={this.state.modal === 'borrow'}
          onClose={this.closeModal}
          actions={
            [<Button variant="contained" color="primary" key="" fullWidth>Buy</Button>]
          }
        />
        <CashFlowModal
          type="selling"
          recommendedPrice="1025 - 1150 DAI"
          onChangeSellPrice={console.log}
          token={mockCashFlow}
          duration={7}
          open={this.state.modal === 'selling'}
          onClose={this.closeModal}
          sellPrice={1050}
          actions={
            [<Button variant="contained" color="primary" key="" fullWidth>Sell cashflow</Button>]
          }
        />
        <TokensList type="selling" />
      </BaseLayout>
    );
  }

  @bind
  public closeModal() {
    this.setState({ modal: null });
  }

  @bind
  public openModal(modal: string) {
    this.setState({ modal });
  }

}

export default Marketplace;
