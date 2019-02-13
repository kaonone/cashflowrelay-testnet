import { BigNumber } from '0x.js';
import * as moment from 'moment';
import { IPaymentOrder, IInstallments, IToken } from 'shared/types/models';

export function calcRepaymentAmount(amount: number, interestByPercent: number) {
  // return amount * (1 + interestByPercent / 100);
  return new BigNumber(amount).times(new BigNumber(interestByPercent).div(100).plus(1));
}

export function calcInstallmentSize(amount: number, interestByPercent: number, installmentCount: number) {
  return calcRepaymentAmount(amount || 1, interestByPercent || 1).div(installmentCount || 1);
}

export function calcInstallmentsCount({ paid, due, missed }: IInstallments) {
  return {
    paid: paid.length,
    due: due.length,
    missed: missed.length,
  };
}

export function calcInstallmentsAmount({ paid, due, missed }: IInstallments) {
  const callback = (sum: number, instalment: IPaymentOrder) => sum + instalment.amount.toNumber();

  return {
    paid: paid.reduce(callback, 0),
    due: due.reduce(callback, 0),
    missed: missed.reduce(callback, 0),
  };
}

export function calcTotalPaidAmount(orders: IPaymentOrder[]): BigNumber {
  return orders
    .filter(order => order.isPayed)
    .reduce(
      (sum: BigNumber, instalment) => sum.add(instalment.amount),
      new BigNumber(0),
    );
}

export function calcIsFullRepaid(orders: IPaymentOrder[], token: IToken): boolean {
  const repaidAmount = orders
    .filter(order => order.isPayed)
    .map(order => order.amount)
    .reduce((cur, acc) => acc.plus(cur), new BigNumber(0));

  return repaidAmount.comparedTo(token.amount) >= 0;
}

export function groupInstallmentsByPaymentStatus(orders: IPaymentOrder[]): IInstallments {
  const today = Date.now();
  const paid = orders.filter(order => order.isPayed);
  const due = orders.filter(({ isPayed, isDeleted, pendingDatePayment }) => {
    const deadline = moment(pendingDatePayment).add(30, 'days').valueOf();
    return !isDeleted && !isPayed && pendingDatePayment < today && today < deadline;
  });
  const missed = orders.filter(({ isPayed, isDeleted, pendingDatePayment }) => {
    const deadline = moment(pendingDatePayment).add(30, 'days').valueOf();
    return !isDeleted && !isPayed && deadline < pendingDatePayment;
  });
  return { paid, due, missed };
}

export function groupInstallmentsByPaymentDate(orders: IPaymentOrder[]): IInstallments {
  const paid = orders.filter(({ isPayed, pendingDatePayment, datePayment }) => {
    return isPayed && datePayment <= pendingDatePayment;
  });
  const due = orders.filter(({ isPayed, pendingDatePayment, datePayment }) => {
    const deadline = moment(pendingDatePayment).add(30, 'days').valueOf();
    return isPayed && pendingDatePayment < datePayment && datePayment <= deadline;
  });
  const missed = orders.filter(({ isPayed, pendingDatePayment, datePayment }) => {
    const deadline = moment(pendingDatePayment).add(30, 'days').valueOf();
    return isPayed && deadline < datePayment;
  });
  return { paid, due, missed };
}

export const OneDAI = new BigNumber('1e18');
