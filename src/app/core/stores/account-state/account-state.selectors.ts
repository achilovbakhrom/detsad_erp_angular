import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AccountStateState } from './account-state.state';

export const selectAccountStateState =
  createFeatureSelector<AccountStateState>('accountState');

export const selectValueFromState = <T>(fn: (state: AccountStateState) => T) =>
  createSelector<object, AccountStateState, T>(selectAccountStateState, fn);

export const selectLoading = selectValueFromState(
  (state: AccountStateState) => state.loading
);

export const selectError = selectValueFromState(
  (state: AccountStateState) => state.error
);

export const selectAccountState = selectValueFromState(
  (state: AccountStateState) => state.data
);
