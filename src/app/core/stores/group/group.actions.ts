import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Group } from '../../../model/Group';

export const saveGroup = createAction(
  '[Group Form] Save Group',
  props<{ group: Group }>()
);

export const saveGroupSuccess = createAction(
  '[Group API] Save Group Success',
  props<{ group: Group }>()
);

export const saveGroupFailure = createAction(
  '[Group API] Save Group Failure',
  props<{ error: any }>()
);

export const fetchGroupList = createAction('[Group List Api] Fetch Group List');

export const fetchGroupListSuccess = createAction(
  '[Group List Api] Fetch Group List Success',
  props<BaseListResponse<Group>>()
);

export const fetchGroupListError = createAction(
  '[Group List Api] Fetch Group List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Group State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Group State] Set Size',
  props<{ size: number }>()
);

export const deleteGroupById = createAction(
  '[Group Api] Delete By Id',
  props<{ id: number }>()
);
