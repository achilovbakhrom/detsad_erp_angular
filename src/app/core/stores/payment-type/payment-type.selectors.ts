import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PaymentTypeState } from './payment-type.state';

export const selectPaymentTypeState =
  createFeatureSelector<PaymentTypeState>('paymentType');

export const selectValueFromState = <T>(fn: (state: PaymentTypeState) => T) =>
  createSelector<object, PaymentTypeState, T>(selectPaymentTypeState, fn);

export const selectPaymentType = selectValueFromState(
  (state: PaymentTypeState) => state.paymentType
);

export const selectLoading = selectValueFromState(
  (state: PaymentTypeState) => state.loading
);

export const selectError = selectValueFromState(
  (state: PaymentTypeState) => state.error
);

export const selectPaymentTypeList = selectValueFromState(
  (state: PaymentTypeState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
