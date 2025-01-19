import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Child } from '../../../model/Child';

export const saveChild = createAction(
  '[Child Form] Save Child',
  props<{ child: Child }>()
);

export const saveChildSuccess = createAction(
  '[Child API] Save Child Success',
  props<{ child: Child }>()
);

export const saveChildFailure = createAction(
  '[Child API] Save Child Failure',
  props<{ error: any }>()
);

export const fetchChildList = createAction('[Child List Api] Fetch Child List');

export const fetchChildListSuccess = createAction(
  '[Child List Api] Fetch Child List Success',
  props<BaseListResponse<Child>>()
);

export const fetchChildListError = createAction(
  '[Child List Api] Fetch Child List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Child State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Child State] Set Size',
  props<{ size: number }>()
);

export const deleteChildById = createAction(
  '[Child Api] Delete By Id',
  props<{ id: number }>()
);
