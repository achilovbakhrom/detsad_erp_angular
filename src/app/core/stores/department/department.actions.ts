import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Department } from '../../../model/Department';

export const saveDepartment = createAction(
  '[Department Form] Save Department',
  props<{ department: Department }>()
);

export const saveDepartmentSuccess = createAction(
  '[Department API] Save Department Success',
  props<{ department: Department }>()
);

export const saveDepartmentFailure = createAction(
  '[Department API] Save Department Failure',
  props<{ error: any }>()
);

export const fetchDepartmentList = createAction(
  '[Department List Api] Fetch Department List'
);

export const fetchDepartmentListSuccess = createAction(
  '[Department List Api] Fetch Department List Success',
  props<BaseListResponse<Department>>()
);

export const fetchDepartmentListError = createAction(
  '[Department List Api] Fetch Department List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Department State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Department State] Set Size',
  props<{ size: number }>()
);

export const deleteDepartmentById = createAction(
  '[Department Api] Delete By Id',
  props<{ id: number }>()
);
