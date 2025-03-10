import { createReducer, on } from '@ngrx/store';
import { getInitialTransactionState } from './transaction.state';
import {
  fetchTransactionError,
  fetchTransactionSuccess,
  saveTransaction,
  saveTransactionError,
  saveTransactionSuccess,
  setPage,
  setSize,
} from './transaction.actions';

export const transactionReducer = createReducer(
  getInitialTransactionState(),
  on(saveTransaction, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveTransactionSuccess, (state, { transaction }) => ({
    ...state,
    loading: false,
    transaction,
    error: null,
  })),
  on(saveTransactionError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchTransactionSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchTransactionError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(setPage, (state, { page }) => ({
    ...state,
    page: page,
  })),
  on(setSize, (state, { size }) => ({
    ...state,
    size: size,
  }))
);
