import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeState } from './employee.state';

export const selectEmployeeState =
  createFeatureSelector<EmployeeState>('employee');

export const selectValueFromState = <T>(fn: (state: EmployeeState) => T) =>
  createSelector<object, EmployeeState, T>(selectEmployeeState, fn);

export const selectEmployee = selectValueFromState(
  (state: EmployeeState) => state.employee
);

export const selectLoading = selectValueFromState(
  (state: EmployeeState) => state.loading
);

export const selectError = selectValueFromState(
  (state: EmployeeState) => state.error
);

export const selectEmployeeList = selectValueFromState(
  (state: EmployeeState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
