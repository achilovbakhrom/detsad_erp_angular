import { createReducer, on } from '@ngrx/store';
import { getInitialBranchState } from './branch.state';
import {
  fetchBranchListError,
  fetchBranchListSuccess,
  saveBranch,
  saveBranchFailure,
  saveBranchSuccess,
} from './branch.actions';

export const branchReducer = createReducer(
  getInitialBranchState(),
  on(saveBranch, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveBranchSuccess, (state, { branch }) => ({
    ...state,
    loading: false,
    branch,
    error: null,
  })),
  on(saveBranchFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchBranchListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchBranchListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
