import { BigNumber } from '0x.js';

export function calcRepaymentAmount(amount: number, interestByPercent: number) {
  // return amount * (1 + interestByPercent / 100);
  return new BigNumber(amount).times(new BigNumber(interestByPercent).div(100).plus(1));
}

export function calcInstallmentSize(amount: number, interestByPercent: number, installmentSize: number) {
  return calcRepaymentAmount(amount, interestByPercent).div(installmentSize);
}

export const OneDAI = new BigNumber('1e18');
