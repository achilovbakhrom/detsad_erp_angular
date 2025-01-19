import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EmployeeContractState } from './employee-contract.state';

export const selectEmployeeState =
  createFeatureSelector<EmployeeContractState>('employee');

export const selectValueFromState = <T>(
  fn: (state: EmployeeContractState) => T
) => createSelector<object, EmployeeContractState, T>(selectEmployeeState, fn);

export const selectEmployee = selectValueFromState(
  (state: EmployeeContractState) => state.employee
);

export const selectLoading = selectValueFromState(
  (state: EmployeeContractState) => state.loading
);

export const selectError = selectValueFromState(
  (state: EmployeeContractState) => state.error
);

export const selectEmployeeList = selectValueFromState(
  (state: EmployeeContractState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
