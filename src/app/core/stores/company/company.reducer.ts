import { createReducer, on } from '@ngrx/store';
import { getInitialCompanyState, initialState } from './company.state';
import {
  fetchCompanyListError,
  fetchCompanyListSuccess,
  saveCompany,
  saveCompanyFailure,
  saveCompanySuccess,
} from './company.actions';

export const companyReducer = createReducer(
  getInitialCompanyState(),
  on(saveCompany, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveCompanySuccess, (state, { company }) => ({
    ...state,
    loading: false,
    company,
    error: null,
  })),
  on(saveCompanyFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchCompanyListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchCompanyListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
