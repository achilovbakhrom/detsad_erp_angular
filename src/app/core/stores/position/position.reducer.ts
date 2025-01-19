import { createReducer, on } from '@ngrx/store';
import { getInitialPositionState } from './position.state';
import {
  fetchPositionListError,
  fetchPositionListSuccess,
  savePosition,
  savePositionFailure,
  savePositionSuccess,
} from './position.actions';

export const positionReducer = createReducer(
  getInitialPositionState(),
  on(savePosition, (state) => ({
    ...state,
    loading: true,
  })),
  on(savePositionSuccess, (state, { position }) => ({
    ...state,
    loading: false,
    position,
    error: null,
  })),
  on(savePositionFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchPositionListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchPositionListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
