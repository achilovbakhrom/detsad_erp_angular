import { Account } from './Account';
import { Child } from './Child';
import { ChildContract } from './ChildContract';
import { Company } from './company';
import { PaymentType } from './PaymentType';

export type Subscription = {
  id?: number;
  date?: string;
  child?: ChildContract;
  amount?: number;
  payment_type?: PaymentType;
  account?: Account;
  description?: string;
  company?: Company;
};

export type SubscriptionInput = Omit<
  Subscription,
  'child' | 'payment_type' | 'account' | 'company'
> & {
  child?: number;
  payment_type?: number;
  account?: number;
};
