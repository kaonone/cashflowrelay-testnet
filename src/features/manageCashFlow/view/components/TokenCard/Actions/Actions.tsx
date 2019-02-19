import * as React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';

import routes from 'modules/routes';

import { useMainContractData } from 'services/transactions';
import { useMyOrder } from 'services/orderbook';

import { SellButton } from 'features/sellCashFlow';
import { BuyButton } from 'features/buyCashFlow';
import { PayButton } from 'features/payInstalment';
import { WithdrawButton } from 'features/withdrawCashFlow';

import { TokenType, IToken, IOrder, IPaymentOrder } from 'shared/types/models';
import { calcIsFullRepaid } from 'shared/model/calculate';

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
  const { data: owner } = useMainContractData('ownerOf', { tokenId: token.id });

  const onBuyToken = React.useCallback(() => {
    props.history.push(routes.cashFlows.type.getRedirectPath({ type: 'incoming' }));
  }, []);

  const onSaleNow: boolean = !orderLoading.isRequesting && !!order;

  if (!owner || !account || paymentOrdersLoading) { return null; }

  const isFullRepaid = calcIsFullRepaid(paymentOrders, token);
  const isMyToken = owner.toLowerCase() === account.toLowerCase();

  type ButtonType = false | [string, React.ReactNode];

  const withdrawButton: ButtonType = isMyToken && !onSaleNow && ['withdraw', (
    <WithdrawButton token={token} disabled={orderLoading.isRequesting} />
  )];
  const sellButton: ButtonType = isMyToken && !isFullRepaid && !onSaleNow && ['sell', (
    <SellButton cashflow={token} disabled={orderLoading.isRequesting} />
  )];
  const payInstallmentButton: ButtonType = !isFullRepaid && ['payInstallment', (
    <PayButton token={token} variant={isMyToken ? 'outlined' : 'contained'} />
  )];
  const buyButton: ButtonType = !!marketOrder && !isMyToken && ['buy', (
    <BuyButton cashflow={token} order={marketOrder} onSuccess={onBuyToken} />
  )];

  const buttonsByType: Record<TokenType, ButtonType[]> = {
    incoming: [sellButton, withdrawButton],
    obligations: [payInstallmentButton, sellButton, isFullRepaid && withdrawButton],
    selling: [buyButton],
  };

  return (
    <>
      {buttonsByType[type].map(button => button && (
        <div key={button[0]} className={buttonClass}>{button[1]}</div>
      ))}
    </>
  );
}

export default withRouter(Actions);
