import { createReducer, on } from '@ngrx/store';
import { getInitialReasonState } from './reason.state';
import {
  fetchReasonListError,
  fetchReasonListSuccess,
  saveReason,
  saveReasonFailure,
  saveReasonSuccess,
} from './reason.actions';

export const reasonReducer = createReducer(
  getInitialReasonState(),
  on(saveReason, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveReasonSuccess, (state, { reason }) => ({
    ...state,
    loading: false,
    reason,
    error: null,
  })),
  on(saveReasonFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchReasonListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchReasonListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
