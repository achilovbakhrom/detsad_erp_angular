import { createReducer, on } from '@ngrx/store';
import { getInitialPaymentTypeState } from './payment-type.state';
import {
  fetchPaymentTypeListError,
  fetchPaymentTypeListSuccess,
  savePaymentType,
  savePaymentTypeFailure,
  savePaymentTypeSuccess,
} from './payment-type.actions';

export const paymentTypeReducer = createReducer(
  getInitialPaymentTypeState(),
  on(savePaymentType, (state) => ({
    ...state,
    loading: true,
  })),
  on(savePaymentTypeSuccess, (state, { paymentType }) => ({
    ...state,
    loading: false,
    paymentType,
    error: null,
  })),
  on(savePaymentTypeFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchPaymentTypeListSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchPaymentTypeListError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  }))
);
