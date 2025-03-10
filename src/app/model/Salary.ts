import { Account } from './Account';
import { Company } from './company';
import { EmployeeContract } from './EmployeeContract';
import { PaymentType } from './PaymentType';

export type Salary = {
  id?: number;
  date: string;
  employee: EmployeeContract;
  description?: string;
  company: Company;
  payment_type?: PaymentType;
  account?: Account;
  amount?: number;
};

export type SalaryInput = Omit<
  Salary,
  'employee' | 'company' | 'payment_type' | 'account'
> & {
  employee: number;
  company?: number;
  payment_type?: number;
  account?: number;
};
