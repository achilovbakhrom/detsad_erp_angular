import { createReducer, on } from '@ngrx/store';
import { getInitialSickLeaveState } from './sick-leave.state';
import {
  fetchSickLeaveError,
  fetchSickLeaveSuccess,
  saveSickLeave,
  saveSickLeaveError,
  saveSickLeaveSuccess,
  setPage,
  setSize,
} from './sick-leave.actions';

export const SickLeaveReducer = createReducer(
  getInitialSickLeaveState(),
  on(saveSickLeave, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveSickLeaveSuccess, (state, { sickLeave }) => ({
    ...state,
    loading: false,
    sickLeave,
    error: null,
  })),
  on(saveSickLeaveError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchSickLeaveSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchSickLeaveError, (state, { error }) => ({
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
