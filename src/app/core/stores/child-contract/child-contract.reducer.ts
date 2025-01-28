import { createReducer, on } from '@ngrx/store';
import { getInitialChildContractState } from './child-contract.state';
import {
  fetchChildContractListError,
  fetchChildContractListSuccess,
  saveChildContract,
  saveChildContractError,
  saveChildContractSuccess,
  setPage,
  setSize,
} from './child-contract.actions';

export const childContractReducer = createReducer(
  getInitialChildContractState(),
  on(saveChildContract, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveChildContractSuccess, (state, { childContract }) => ({
    ...state,
    loading: false,
    childContract,
    error: null,
  })),
  on(saveChildContractError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchChildContractListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchChildContractListError, (state, { error }) => ({
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
