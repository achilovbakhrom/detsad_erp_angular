import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { PaymentType } from '../../../model/PaymentType';

export type PaymentTypeState = BaseListState<PaymentType> & {
  paymentType: Nillable<PaymentType>;
  error: any;
};

export const initialState: PaymentTypeState = {
  data: null,
  total: null,
  page: null,
  size: null,
  paymentType: null,
  loading: false,
  error: null,
};

export function getInitialPaymentTypeState(): PaymentTypeState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.paymentType || initialState;
}
