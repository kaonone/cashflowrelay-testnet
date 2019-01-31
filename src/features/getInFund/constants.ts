import { TimePeriod } from 'shared/types/models';

const availablePeriodicity: TimePeriod[] = ['day', 'week', 'month', 'quarter', 'year'];

export const createCashFlowConfig = {
  defaultName: 'CashFlow',
  minAmount: 0,
  defaultAmount: 100,
  minInterest: 1,
  defaultInterest: 10,
  maxInterest: 99,
  minInstallmentCount: 1,
  defaultInstallmentCount: 6,
  defaultPeriodicity: 'month' as TimePeriod,
  availablePeriodicity,
};
