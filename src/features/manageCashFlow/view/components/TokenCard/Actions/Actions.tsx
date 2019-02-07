import * as React from 'react';

import { ShowMainContractData } from 'services/transactions';
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

class Actions extends React.PureComponent<IProps, {}> {
  public render() {
    const { type, account, buttonClass, marketOrder, token, paymentOrdersLoading, paymentOrders } = this.props;
    return (
      <ShowMainContractData<'ownerOf'> type="ownerOf" request={{ tokenId: token.id }}>
        {({ data: owner }) => {
          if (!owner || !account || paymentOrdersLoading) { return null; }

          const totalPaidAmount = calcTotalPaidAmount(paymentOrders);
          const isFullRepaid = token.amount.comparedTo(totalPaidAmount) <= 0;

          const onSaleNow: boolean = false; // TODO ds: check token on sale
          const isMyToken = owner.toLowerCase() === account.toLowerCase();

          const withdrawButton = isMyToken && !onSaleNow && (
            <div className={buttonClass}>
              <WithdrawButton token={token} />
            </div>
          );
          const sellButton = isMyToken && !isFullRepaid && (
            <div className={buttonClass}>
              <SellButton cashflow={token} disabled={onSaleNow} />
            </div>
          );
          const payInstallmentButton = !isFullRepaid && (
            <div className={buttonClass}>
              <PayButton token={token} variant={isMyToken ? 'outlined' : 'contained'} />
            </div>
          );
          const buyButton = !!marketOrder && !isMyToken && (
            <div className={buttonClass}>
              <BuyButton cashflow={token} order={marketOrder} />
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
}

export default Actions;
