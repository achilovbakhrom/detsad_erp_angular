import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SalaryState } from './salary.state';

export const selectSalaryState = createFeatureSelector<SalaryState>('salary');

export const selectValueFromState = <T>(fn: (state: SalaryState) => T) =>
  createSelector<object, SalaryState, T>(selectSalaryState, fn);

export const selectSalary = selectValueFromState(
  (state: SalaryState) => state.salary
);

export const selectLoading = selectValueFromState(
  (state: SalaryState) => state.loading
);

export const selectError = selectValueFromState(
  (state: SalaryState) => state.error
);

export const selectSalaryList = selectValueFromState(
  (state: SalaryState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
