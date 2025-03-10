import { Account } from './Account';
import { PaymentType } from './PaymentType';

export type Balance = {
  account?: Account;
  payment_type?: PaymentType;
  balance?: string;
};

export type AccountTransaction = {
  date?: string;
  account?: Account;
  payment_type?: PaymentType;
  amount?: string;
  tx_type?: string;
  entity_id?: number;
};

export type AccountState = {
  balance?: Balance[];
  transactions?: AccountTransaction[];
};
