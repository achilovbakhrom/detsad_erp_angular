import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DepartmentState } from './department.state';

export const selectDepartmentState =
  createFeatureSelector<DepartmentState>('department');

export const selectValueFromState = <T>(fn: (state: DepartmentState) => T) =>
  createSelector<object, DepartmentState, T>(selectDepartmentState, fn);

export const selectDepartment = selectValueFromState(
  (state: DepartmentState) => state.department
);

export const selectLoading = selectValueFromState(
  (state: DepartmentState) => state.loading
);

export const selectError = selectValueFromState(
  (state: DepartmentState) => state.error
);

export const selectDepartmentList = selectValueFromState(
  (state: DepartmentState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
