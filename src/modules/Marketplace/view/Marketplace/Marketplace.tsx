import * as React from 'react';
import { bind } from 'decko';

import { InjectOrderbookProps, withOrderbook } from 'services/orderbook';
import { BaseLayout } from 'modules/shared';
import { TokensList } from 'features/manageCashFlow';

import { CircleProgressBar } from 'shared/view/elements';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

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
