import { createReducer, on } from '@ngrx/store';
import { getInitialEmployeeContractState } from './employee-contract.state';
import {
  fetchEmployeeContractListError,
  fetchEmployeeContractListSuccess,
  saveEmployeeContract,
  saveEmployeeContractFailure,
  saveEmployeeContractSuccess,
  setPage,
  setSize,
} from './employee-contract.actions';

export const employeeContractReducer = createReducer(
  getInitialEmployeeContractState(),
  on(saveEmployeeContract, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveEmployeeContractSuccess, (state, { employeeContract: employee }) => ({
    ...state,
    loading: false,
    employee,
    error: null,
  })),
  on(saveEmployeeContractFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchEmployeeContractListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchEmployeeContractListError, (state, { error }) => ({
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
