import { createReducer, on } from '@ngrx/store';
import { getInitialEmployeeState } from './employee.state';
import {
  fetchEmployeeListError,
  fetchEmployeeListSuccess,
  saveEmployee,
  saveEmployeeFailure,
  saveEmployeeSuccess,
} from './employee.actions';

export const employeeReducer = createReducer(
  getInitialEmployeeState(),
  on(saveEmployee, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveEmployeeSuccess, (state, { employee }) => ({
    ...state,
    loading: false,
    employee,
    error: null,
  })),
  on(saveEmployeeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchEmployeeListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchEmployeeListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
