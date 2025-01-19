import { createReducer, on } from '@ngrx/store';
import { getInitialChildState } from './child.state';
import {
  fetchChildListError,
  fetchChildListSuccess,
  saveChild,
  saveChildFailure,
  saveChildSuccess,
} from './child.actions';

export const childReducer = createReducer(
  getInitialChildState(),
  on(saveChild, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveChildSuccess, (state, { child }) => ({
    ...state,
    loading: false,
    child,
    error: null,
  })),
  on(saveChildFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchChildListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchChildListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
