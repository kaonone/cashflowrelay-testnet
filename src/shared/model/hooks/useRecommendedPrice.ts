import { BigNumber } from '0x.js';
import { usePaymentOrders, useMainContractData } from 'services/transactions';
import { calcRepaidAmount } from '../calculate';
import { useMemo } from 'react';

interface InjectProps {
  isLoading: boolean;
  recommendedPrice: null | {
    min: BigNumber;
    avg: BigNumber;
    max: BigNumber;
  };
}

export default function useRecommendedPrice(tokenId: string): InjectProps {
  const { data: token } = useMainContractData('cashflowFor', { tokenId });
  const { orders: paymentOrders, ordersLoading: paymentOrdersLoading } = usePaymentOrders(tokenId);

  return useMemo<InjectProps>(() => {
    if (!token || paymentOrdersLoading) {
      return { recommendedPrice: null, isLoading: true };
    }

    const { amount, interestRate, balance } = token;
    const percent = new BigNumber(interestRate).div(100);
    const delta = percent.div(3);

    const repaidAmount = calcRepaidAmount(paymentOrders);
    const debt = amount.minus(repaidAmount);
    const borrowAmount = debt.div(new BigNumber(1).minus(percent));

    const avg = borrowAmount.plus(balance).round(2, BigNumber.ROUND_CEIL);
    const min = borrowAmount.times(new BigNumber(1).minus(delta)).plus(balance).round(2, BigNumber.ROUND_CEIL);
    const max = borrowAmount.times(new BigNumber(1).plus(delta)).plus(balance).round(2, BigNumber.ROUND_CEIL);

    return {
      isLoading: false,
      recommendedPrice: { avg, min, max },
    };
  }, [token, paymentOrders, paymentOrdersLoading]);
}
