import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Account } from '../../../model/Account';

export type AccountState = BaseListState<Account> & {
  account: Nillable<Account>;
  error: any;
};

export const initialState: AccountState = {
  data: null,
  total: null,
  page: null,
  size: null,
  account: null,
  loading: false,
  error: null,
};

export function getInitialAccountState(): AccountState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.account || initialState;
}
