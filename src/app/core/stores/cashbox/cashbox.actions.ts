import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Cashbox, CashboxInput } from '../../../model/Cashbox';

export const saveCashbox = createAction(
  '[Cashbox Form] Save Cashbox',
  props<{ cashbox: CashboxInput }>()
);

export const saveCashboxSuccess = createAction(
  '[Cashbox API] Save Cashbox Success',
  props<{ cashbox: Cashbox }>()
);

export const saveCashboxError = createAction(
  '[Cashbox API] Save Cashbox Failure',
  props<{ error: any }>()
);

export const fetchCashboxList = createAction(
  '[Cashbox List Api] Fetch Cashbox List'
);

export const fetchCashboxSuccess = createAction(
  '[Cashbox List Api] Fetch Cashbox List Success',
  props<BaseListResponse<Cashbox>>()
);

export const fetchCashboxError = createAction(
  '[Cashbox List Api] Fetch Cashbox List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Cashbox State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Cashbox State] Set Size',
  props<{ size: number }>()
);

export const deleteCashboxById = createAction(
  '[Cashbox Api] Delete By Id',
  props<{ id: number }>()
);

export const deleteCashboxSuccess = createAction(
  '[Cashbox Api] Delete By Id Success'
);

export const deleteCashboxByIdError = createAction(
  '[Cashbox Api] Delete By Id Error'
);
