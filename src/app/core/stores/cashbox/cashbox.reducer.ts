import { createReducer, on } from '@ngrx/store';
import { getInitialCashboxState } from './cashbox.state';
import {
  fetchCashboxError,
  fetchCashboxSuccess,
  saveCashbox,
  saveCashboxError,
  saveCashboxSuccess,
  setPage,
  setSize,
} from './cashbox.actions';

export const cashboxReducer = createReducer(
  getInitialCashboxState(),
  on(saveCashbox, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveCashboxSuccess, (state, { cashbox }) => ({
    ...state,
    loading: false,
    cashbox,
    error: null,
  })),
  on(saveCashboxError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchCashboxSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchCashboxError, (state, { error }) => ({
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
