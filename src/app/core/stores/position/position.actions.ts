import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Position } from '../../../model/Position';

export const savePosition = createAction(
  '[Position Form] Save Position',
  props<{ position: Position }>()
);

export const savePositionSuccess = createAction(
  '[Position API] Save Position Success',
  props<{ position: Position }>()
);

export const savePositionFailure = createAction(
  '[Position API] Save Position Failure',
  props<{ error: any }>()
);

export const fetchPositionList = createAction(
  '[Position List Api] Fetch Position List'
);

export const fetchPositionListSuccess = createAction(
  '[Position List Api] Fetch Position List Success',
  props<BaseListResponse<Position>>()
);

export const fetchPositionListError = createAction(
  '[Position List Api] Fetch Position List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Position State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Position State] Set Size',
  props<{ size: number }>()
);

export const deletePositionById = createAction(
  '[Position Api] Delete By Id',
  props<{ id: number }>()
);
