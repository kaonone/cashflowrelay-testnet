import BN from 'bignumber.js';

export function calcRepaymentAmount(amount: number, interestByPercent: number) {
  // return amount * (1 + interestByPercent / 100);
  return new BN(amount).times(new BN(interestByPercent).div(100).plus(1));
}

export function calcInstallmentSize(amount: number, interestByPercent: number, installmentSize: number) {
  return calcRepaymentAmount(amount, interestByPercent).div(installmentSize);
}

export const OneDAI = new BN('1e18');
