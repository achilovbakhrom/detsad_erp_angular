import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { PaymentType } from '../../../model/PaymentType';

export const savePaymentType = createAction(
  '[PaymentType Form] Save PaymentType',
  props<{ paymentType: PaymentType }>()
);

export const savePaymentTypeSuccess = createAction(
  '[PaymentType API] Save PaymentType Success',
  props<{ paymentType: PaymentType }>()
);

export const savePaymentTypeFailure = createAction(
  '[PaymentType API] Save PaymentType Failure',
  props<{ error: any }>()
);

export const fetchPaymentTypeList = createAction(
  '[PaymentType List Api] Fetch PaymentType List'
);

export const fetchPaymentTypeListSuccess = createAction(
  '[PaymentType List Api] Fetch PaymentType List Success',
  props<BaseListResponse<PaymentType>>()
);

export const fetchPaymentTypeListError = createAction(
  '[PaymentType List Api] Fetch PaymentType List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[PaymentType State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[PaymentType State] Set Size',
  props<{ size: number }>()
);

export const deletePaymentTypeById = createAction(
  '[PaymentType Api] Delete By Id',
  props<{ id: number }>()
);
