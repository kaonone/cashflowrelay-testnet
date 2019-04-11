import { useMemo } from 'react';
import { useMyOrder } from 'services/orderbook';
import { usePaymentOrders, useMainContractData } from 'services/transactions';

import { TokenStatus } from 'shared/types/models';
import { useDrizzle } from 'shared/helpers/react';

import { calcIsFullRepaid } from '../calculate';

interface InjectProps {
  status: TokenStatus | null;
  statusLoading: boolean;
}

export default function useTokenStatus(tokenId: string): InjectProps {
  const { drizzleState } = useDrizzle();
  const account = drizzleState.accounts[0];

  const { data: token } = useMainContractData('cashflowFor', { tokenId });
  const { data: owner } = useMainContractData('ownerOf', { tokenId });
  const { orders: paymentOrders, ordersLoading: paymentOrdersLoading } = usePaymentOrders(tokenId);
  const { order: marketplaceOrder, orderLoading: marketplaceOrderLoading } = useMyOrder(tokenId);

  return useMemo<InjectProps>(() => {
    if (!token || !owner || paymentOrdersLoading || marketplaceOrderLoading.isRequesting) {
      return { status: null, statusLoading: true };
    }

    const isFullRepaid = calcIsFullRepaid(paymentOrders, token);
    const isNullBalance = token.balance.comparedTo(0) === 0;
    const isPayer = account.toLowerCase() === token.payer.toLowerCase();
    const isOwner = account.toLowerCase() === owner.toLowerCase();
    const isOnSale = !!marketplaceOrder;

    const isCompleted = (
      (isPayer && !isOwner && isFullRepaid) ||
      (isOwner && isFullRepaid && isNullBalance)
    );
    const isAwaitingBuyer = isOwner && isOnSale;
    const isSold = isPayer && !isOwner;
    const isSaving = isPayer && isOwner && !isOnSale && !isFullRepaid;

    if (isCompleted) { return { status: 'completed', statusLoading: false }; }
    if (isAwaitingBuyer) { return { status: 'awaitingBuyer', statusLoading: false }; }
    if (isSold) { return { status: 'sold', statusLoading: false }; }
    if (isSaving) { return { status: 'saving', statusLoading: false }; }
    return { status: null, statusLoading: false };
  }, [account, token, owner, paymentOrders, paymentOrdersLoading, marketplaceOrder, marketplaceOrderLoading]);
}
