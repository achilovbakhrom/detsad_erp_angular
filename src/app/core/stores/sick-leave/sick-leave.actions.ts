import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { SickLeave, SickLeaveInput } from '../../../model/SickLeave';

export const saveSickLeave = createAction(
  '[SickLeave Form] Save SickLeave',
  props<{ sickLeave: SickLeaveInput }>()
);

export const saveSickLeaveSuccess = createAction(
  '[SickLeave API] Save SickLeave Success',
  props<{ sickLeave: SickLeave }>()
);

export const saveSickLeaveError = createAction(
  '[SickLeave API] Save SickLeave Failure',
  props<{ error: any }>()
);

export const fetchSickLeaveList = createAction(
  '[SickLeave List Api] Fetch SickLeave List'
);

export const fetchSickLeaveSuccess = createAction(
  '[SickLeave List Api] Fetch SickLeave List Success',
  props<BaseListResponse<SickLeave>>()
);

export const fetchSickLeaveError = createAction(
  '[SickLeave List Api] Fetch SickLeave List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[SickLeave State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[SickLeave State] Set Size',
  props<{ size: number }>()
);

export const deleteSickLeaveById = createAction(
  '[SickLeave Api] Delete By Id',
  props<{ id: number }>()
);

export const deleteSickLeaveSuccess = createAction(
  '[SickLeave Api] Delete By Id Success'
);

export const deleteSickLeaveByIdError = createAction(
  '[SickLeave Api] Delete By Id Error'
);
