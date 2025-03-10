import { createReducer, on } from '@ngrx/store';
import { getInitialAccountState } from './account.state';
import {
  fetchAccountListError,
  fetchAccountListSuccess,
  saveAccount,
  saveAccountFailure,
  saveAccountSuccess,
} from './account.actions';

export const accountReducer = createReducer(
  getInitialAccountState(),
  on(saveAccount, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveAccountSuccess, (state, { account }) => ({
    ...state,
    loading: false,
    account,
    error: null,
  })),
  on(saveAccountFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchAccountListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchAccountListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
