import { ChildContract } from './ChildContract';
import { Company } from './company';

export type SickLeave = {
  id?: number;
  date: string;
  child: ChildContract;
  company: Company;
  has_reason: boolean;
  description?: string;
};

export type SickLeaveInput = Omit<SickLeave, 'child' | 'company'> & {
  child: number;
  company?: number;
};
