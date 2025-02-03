import { createReducer, on } from '@ngrx/store';
import { getInitialGroupRegistrationState } from './group-registration.state';
import {
  fetchChildContractSuccess,
  fetchGroupRegistrationListError,
  fetchGroupRegistrationListSuccess,
  saveGroupRegistration,
  saveGroupRegistrationError,
  saveGroupRegistrationSuccess,
  setPage,
  setSize,
} from './group-registration.actions';

export const groupRegistrationReducer = createReducer(
  getInitialGroupRegistrationState(),
  on(saveGroupRegistration, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveGroupRegistrationSuccess, (state, { groupRegistration }) => ({
    ...state,
    loading: false,
    groupRegistration,
    error: null,
  })),
  on(saveGroupRegistrationError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchGroupRegistrationListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchGroupRegistrationListError, (state, { error }) => ({
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
  })),
  on(fetchChildContractSuccess, (state, { childContracts }) => ({
    ...state,
    childContracts: childContracts,
  }))
);
