import { createReducer, on } from '@ngrx/store';
import { getInitialSalaryState } from './salary.state';
import {
  fetchSalaryError,
  fetchSalarySuccess,
  saveSalary,
  saveSalaryError,
  saveSalarySuccess,
  setPage,
  setSize,
} from './salary.actions';

export const salaryReducer = createReducer(
  getInitialSalaryState(),
  on(saveSalary, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveSalarySuccess, (state, { salary }) => ({
    ...state,
    loading: false,
    salary,
    error: null,
  })),
  on(saveSalaryError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchSalarySuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchSalaryError, (state, { error }) => ({
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
