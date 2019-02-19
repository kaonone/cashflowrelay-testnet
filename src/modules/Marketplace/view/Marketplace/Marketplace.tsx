import * as React from 'react';

import { useOrderbook } from 'services/orderbook';
import { BaseLayout } from 'modules/shared';
import { TokensList } from 'features/manageCashFlow';

import { CircleProgressBar } from 'shared/view/elements';
import { InjectedAuthRouterProps } from 'shared/helpers/authWrapper';

type IProps = InjectedAuthRouterProps;

function Marketplace(_props: IProps) {
  const { orders, ordersLoading } = useOrderbook();

  return (
    <BaseLayout>
      {orders.records.length === 0 && ordersLoading.isRequesting && <CircleProgressBar size={40} />}
      <TokensList type="selling" orders={orders} />
    </BaseLayout>
  );
}

export default Marketplace;
