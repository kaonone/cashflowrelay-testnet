import { TimePeriod } from 'shared/types/models';

export interface IFormData {
  name: string;
  amount?: number;
  interest?: number;
  installmentSize: number;
  installmentCount?: number;
  periodicity: TimePeriod;
  stakeSize?: number;
}
