import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CashboxState } from './cashbox.state';

export const selectCashboxState =
  createFeatureSelector<CashboxState>('cashbox');

export const selectValueFromState = <T>(fn: (state: CashboxState) => T) =>
  createSelector<object, CashboxState, T>(selectCashboxState, fn);

export const selectCashbox = selectValueFromState(
  (state: CashboxState) => state.cashbox
);

export const selectLoading = selectValueFromState(
  (state: CashboxState) => state.loading
);

export const selectError = selectValueFromState(
  (state: CashboxState) => state.error
);

export const selectCashboxList = selectValueFromState(
  (state: CashboxState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
