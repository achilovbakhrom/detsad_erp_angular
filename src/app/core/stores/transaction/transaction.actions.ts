import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Transaction, TransactionInput } from '../../../model/Transaction';

export const saveTransaction = createAction(
  '[Transaction Form] Save Transaction',
  props<{ transaction: TransactionInput }>()
);

export const saveTransactionSuccess = createAction(
  '[Transaction API] Save Transaction Success',
  props<{ transaction: Transaction }>()
);

export const saveTransactionError = createAction(
  '[Transaction API] Save Transaction Failure',
  props<{ error: any }>()
);

export const fetchTransactionList = createAction(
  '[Transaction List Api] Fetch Transaction List'
);

export const fetchTransactionSuccess = createAction(
  '[Transaction List Api] Fetch Transaction List Success',
  props<BaseListResponse<Transaction>>()
);

export const fetchTransactionError = createAction(
  '[Transaction List Api] Fetch Transaction List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Transaction State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Transaction State] Set Size',
  props<{ size: number }>()
);

export const deleteTransactionById = createAction(
  '[Transaction Api] Delete By Id',
  props<{ id: number }>()
);

export const deleteTransactionSuccess = createAction(
  '[Transaction Api] Delete By Id Success'
);

export const deleteTransactionByIdError = createAction(
  '[Transaction Api] Delete By Id Error'
);
