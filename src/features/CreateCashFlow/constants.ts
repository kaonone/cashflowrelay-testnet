import { TimePeriod } from 'shared/types/models';
import { IFormData } from './namespace';

const availablePeriodicity: TimePeriod[] = ['day', 'week', 'month', 'quarter', 'year'];

export const createCashFlowConfig = {
  defaultName: 'Money for ...',
  maxNameLength: 50,
  minAmount: 0,
  defaultAmount: 100,
  minInterest: 1,
  defaultInterest: 10,
  maxInterest: 100,
  minInstallmentCount: 1,
  defaultInstallmentCount: 6,
  defaultPeriodicity: 'month' as TimePeriod,
  availablePeriodicity,
};

export const fieldNames: { [key in keyof IFormData]: key } = {
  name: 'name',
  amount: 'amount',
  interest: 'interest',
  installmentSize: 'installmentSize',
  installmentCount: 'installmentCount',
  periodicity: 'periodicity',
};
