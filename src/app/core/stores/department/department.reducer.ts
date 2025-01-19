import { createReducer, on } from '@ngrx/store';
import { getInitialDepartmentState } from './department.state';
import {
  fetchDepartmentListError,
  fetchDepartmentListSuccess,
  saveDepartment,
  saveDepartmentFailure,
  saveDepartmentSuccess,
} from './department.actions';

export const departmentReducer = createReducer(
  getInitialDepartmentState(),
  on(saveDepartment, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveDepartmentSuccess, (state, { department }) => ({
    ...state,
    loading: false,
    department,
    error: null,
  })),
  on(saveDepartmentFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchDepartmentListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchDepartmentListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
