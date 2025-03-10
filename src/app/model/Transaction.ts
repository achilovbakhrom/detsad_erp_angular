import { Account } from './Account';

import { Company } from './company';
import { PaymentType } from './PaymentType';
import { Reason } from './Reason';

export enum TransactionType {
  Income = 'income',
  Expense = 'expense',
}

export type Transaction = {
  id?: number;
  date: string;
  amount: number;
  payment_type: PaymentType;
  account: Account;
  reason?: Reason;
  description?: string;
  transaction_type: TransactionType;
  company: Company;
};

export type TransactionInput = Omit<
  Transaction,
  'payment_type' | 'account' | 'reason' | 'company'
> & {
  payment_type: number;
  account: number;
  reason: number;
};
