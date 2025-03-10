import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Transaction } from '../../../model/Transaction';

export type TransactionState = BaseListState<Transaction> & {
  transaction: Nillable<Transaction>;
  error: any;
};

export const initialState: TransactionState = {
  data: null,
  total: null,
  page: null,
  size: null,
  transaction: null,
  loading: false,
  error: null,
};

export function getInitialTransactionState(): TransactionState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.transaction || initialState;
}
