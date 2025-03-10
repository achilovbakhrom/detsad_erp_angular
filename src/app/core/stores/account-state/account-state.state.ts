import { AccountState } from '../../../model/AccountState';
import { Nillable } from '../../../model/nullable';

export type AccountStateState = {
  data?: Nillable<AccountState>;
  loading: boolean;
  error: any;
};

export const initialState: AccountStateState = {
  data: null,
  loading: false,
  error: null,
};

export function getInitialAccountStateState(): AccountStateState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.accountState || initialState;
}
