import * as React from 'react';
import { bind } from 'decko';

import { InjectOrderbookProps, withOrderbook } from 'services/orderbook';
import { BaseLayout } from 'modules/shared';
import { TokensList } from 'features/manageCashFlow';

import { mockCashFlow } from 'shared/helpers/mocks';
import { DrawerModal } from 'shared/view/components';
import { Button, CircleProgressBar } from 'shared/view/elements';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';
import CashFlowInfo from 'shared/view/model/CashFlowInfo/CashFlowInfo';

const hintForCreation =
  'Borrowing money is a two-step process. First, a cashflow is created. Then, it’s placed on the markeplace for sale.';

type IProps = InjectedAuthRouterProps & InjectOrderbookProps;

interface IState {
  modal: 'borrow' | null;
}

class Marketplace extends React.PureComponent<IProps> {
  public state: IState = { modal: null };
  public render() {
    const { orders, ordersLoading } = this.props;
    return (
      <BaseLayout>
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
          <Button variant="contained" onClick={this.openModal.bind(this, 'borrow')}>OPEN BORROW MODAL</Button>
        </div>
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
            price={1000}
            fields={[
              'amount', 'instalmentSize', 'duration',
              'firstInstalmentDate', 'lastInstalmentDate',
            ]}
          />
        </DrawerModal>
        {orders.records.length === 0 && ordersLoading.isRequesting && <CircleProgressBar size={40} />}
        <TokensList type="selling" orders={orders} />
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

export default withOrderbook(Marketplace);
