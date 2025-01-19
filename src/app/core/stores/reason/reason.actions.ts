import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Reason } from '../../../model/Reason';

export const saveReason = createAction(
  '[Reason Form] Save Reason',
  props<{ reason: Reason }>()
);

export const saveReasonSuccess = createAction(
  '[Reason API] Save Reason Success',
  props<{ reason: Reason }>()
);

export const saveReasonFailure = createAction(
  '[Reason API] Save Reason Failure',
  props<{ error: any }>()
);

export const fetchReasonList = createAction(
  '[Reason List Api] Fetch Reason List'
);

export const fetchReasonListSuccess = createAction(
  '[Reason List Api] Fetch Reason List Success',
  props<BaseListResponse<Reason>>()
);

export const fetchReasonListError = createAction(
  '[Reason List Api] Fetch Reason List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Reason State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Reason State] Set Size',
  props<{ size: number }>()
);

export const deleteReasonById = createAction(
  '[Reason Api] Delete By Id',
  props<{ id: number }>()
);
