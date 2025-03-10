import { createReducer, on } from '@ngrx/store';
import { getInitialAccountStateState } from './account-state.state';
import {
  fetchAccountStateError,
  fetchAccountStateSuccess,
} from './account-state.actions';

export const accountStateReducer = createReducer(
  getInitialAccountStateState(),

  on(fetchAccountStateSuccess, (state, response) => ({
    ...state,
    loading: false,
    data: response,
  })),
  on(fetchAccountStateError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
