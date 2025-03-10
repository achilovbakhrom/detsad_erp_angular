import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TransactionState } from './transaction.state';

export const selectTransactionState =
  createFeatureSelector<TransactionState>('transaction');

export const selectValueFromState = <T>(fn: (state: TransactionState) => T) =>
  createSelector<object, TransactionState, T>(selectTransactionState, fn);

export const selectTransaction = selectValueFromState(
  (state: TransactionState) => state.transaction
);

export const selectLoading = selectValueFromState(
  (state: TransactionState) => state.loading
);

export const selectError = selectValueFromState(
  (state: TransactionState) => state.error
);

export const selectTransactionList = selectValueFromState(
  (state: TransactionState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
