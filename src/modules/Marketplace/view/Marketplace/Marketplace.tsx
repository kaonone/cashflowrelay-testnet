import * as React from 'react';
import { bind } from 'decko';

import { BaseLayout } from 'modules/shared';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import { TokensList } from 'features/manageCashFlow';
import { Button } from 'shared/view/elements';
import { mockCashFlow } from 'shared/helpers/mocks';
import { DrawerModal } from 'shared/view/components';
import CashFlowInfo from 'shared/view/model/CashFlowInfo/CashFlowInfo';
import SellingPriceField from 'shared/view/model/SellingPriceField/SellingPriceField';

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
        <DrawerModal
          onClose={this.closeModal}
          open={this.state.modal === 'create'}
          title={mockCashFlow.name}
          hint={hintForCreation}
          actions={
            [<Button variant="contained" color="primary" key="" fullWidth>Create cashflow</Button>]
          }
        >
          <CashFlowInfo
            token={mockCashFlow}
            fields={[
              'dueAmount', 'repayingAmount', 'instalmentSize', 'duration',
              'firstInstalmentDate', 'lastInstalmentDate',
            ]}
          />
        </DrawerModal>
        <DrawerModal
          title={mockCashFlow.name}
          open={this.state.modal === 'borrow'}
          onClose={this.closeModal}
          actions={
            [<Button variant="contained" color="primary" key="" fullWidth>Buy</Button>]
          }
        >
          <CashFlowInfo
            token={mockCashFlow}
            fields={[
              'dueAmount', 'repayingAmount', 'instalmentSize', 'duration',
              'firstInstalmentDate', 'lastInstalmentDate',
            ]}
          />
        </DrawerModal>
        <DrawerModal
          open={this.state.modal === 'selling'}
          title={mockCashFlow.name}
          onClose={this.closeModal}
          actions={
            [<Button variant="contained" color="primary" key="" fullWidth>Sell cashflow</Button>]
          }
        >
          <>
            <SellingPriceField
              sellPrice={1050}
              onChangeSellPrice={console.log}
            />
            <CashFlowInfo
              recommendedPrice="1025 - 1150 DAI"
              token={mockCashFlow}
              fields={['instalmentSize', 'duration', 'firstInstalmentDate', 'lastInstalmentDate']}
            />
          </>
        </DrawerModal>
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
