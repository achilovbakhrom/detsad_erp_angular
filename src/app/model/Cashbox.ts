import { ChildContract } from './ChildContract';
import { Company } from './company';
import { EmployeeContract } from './EmployeeContract';
import { PaymentType } from './PaymentType';
import { Reason } from './Reason';

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export type Cashbox = {
  id?: number;
  date: string;
  amount: number;
  payment_type: PaymentType;
  reason: Reason;
  description?: string;
  transaction_type: TransactionType;
  company: Company;
  child?: ChildContract;
};

export type CashboxInput = Omit<
  Cashbox,
  'payment_type' | 'reason' | 'company' | 'child'
> & {
  payment_type: number;
  reason: number;
  company?: number;
  child?: number;
};
