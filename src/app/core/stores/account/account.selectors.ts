import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountState } from './account.state';

export const selectAccountState =
  createFeatureSelector<AccountState>('account');

export const selectValueFromState = <T>(fn: (state: AccountState) => T) =>
  createSelector<object, AccountState, T>(selectAccountState, fn);

export const selectAccount = selectValueFromState(
  (state: AccountState) => state.account
);

export const selectLoading = selectValueFromState(
  (state: AccountState) => state.loading
);

export const selectError = selectValueFromState(
  (state: AccountState) => state.error
);

export const selectAccountList = selectValueFromState(
  (state: AccountState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
