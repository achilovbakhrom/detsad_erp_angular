import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CompanyState } from './company.state';

export const selectCompanyState =
  createFeatureSelector<CompanyState>('company');

export const selectValueFromState = <T>(fn: (state: CompanyState) => T) =>
  createSelector<object, CompanyState, T>(selectCompanyState, fn);

export const selectCompany = selectValueFromState(
  (state: CompanyState) => state.company
);

export const selectLoading = selectValueFromState(
  (state: CompanyState) => state.loading
);

export const selectError = selectValueFromState(
  (state: CompanyState) => state.error
);

export const selectCompanyList = selectValueFromState(
  (state: CompanyState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
