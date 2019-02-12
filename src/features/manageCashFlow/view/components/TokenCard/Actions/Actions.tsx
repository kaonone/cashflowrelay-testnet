import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import routes from 'modules/routes';

import { ShowMainContractData } from 'services/transactions';
import { useMyOrder } from 'services/orderbook';

import { SellButton } from 'features/sellCashFlow';
import { BuyButton } from 'features/buyCashFlow';
import { PayButton } from 'features/payInstalment';
import { WithdrawButton } from 'features/withdrawCashFlow';

import { TokenType, IToken, IOrder, IPaymentOrder } from 'shared/types/models';
import { calcTotalPaidAmount } from 'shared/helpers/model';

interface IProps {
  type: TokenType;
  token: IToken;
  account: string | null;
  buttonClass: string;
  marketOrder?: IOrder;
  paymentOrders: IPaymentOrder[];
  paymentOrdersLoading: boolean;
}

function Actions(props: IProps & RouteComponentProps) {
  const { type, account, buttonClass, marketOrder, token, paymentOrdersLoading, paymentOrders } = props;
  const { order, orderLoading } = useMyOrder(token.id);

  const onBuyToken = React.useCallback(() => {
    props.history.push(routes.cashFlows.type.getRedirectPath({ type: 'incoming' }));
  }, []);

  const onSaleNow: boolean = !orderLoading.isRequesting && !!order; // TODO ds: check token on sale

  return (
    <ShowMainContractData<'ownerOf'> type="ownerOf" request={{ tokenId: token.id }}>
      {({ data: owner }) => {
        if (!owner || !account || paymentOrdersLoading) { return null; }

        const totalPaidAmount = calcTotalPaidAmount(paymentOrders);
        const isFullRepaid = token.amount.comparedTo(totalPaidAmount) <= 0;

        const isMyToken = owner.toLowerCase() === account.toLowerCase();

        const withdrawButton = isMyToken && !onSaleNow && (
          <div className={buttonClass}>
            <WithdrawButton token={token} disabled={orderLoading.isRequesting} />
          </div>
        );
        const sellButton = isMyToken && !isFullRepaid && !onSaleNow && (
          <div className={buttonClass}>
            <SellButton cashflow={token} disabled={orderLoading.isRequesting} />
          </div>
        );
        const payInstallmentButton = !isFullRepaid && (
          <div className={buttonClass}>
            <PayButton token={token} variant={isMyToken ? 'outlined' : 'contained'} />
          </div>
        );
        const buyButton = !!marketOrder && !isMyToken && (
          <div className={buttonClass}>
            <BuyButton cashflow={token} order={marketOrder} onSuccess={onBuyToken} />
          </div>
        );

        const renderByType: Record<TokenType, () => React.ReactNode> = {
          incoming: () => (<>
            {sellButton}
            {withdrawButton}
          </>),
          obligations: () => (<>
            {payInstallmentButton}
            {sellButton}
            {isFullRepaid && withdrawButton}
          </>),
          selling: () => <>{buyButton}</>,
        };

        return renderByType[type]();
      }}
    </ShowMainContractData>
  );
}

export default withRouter(Actions);
