import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Branch } from '../../../model/Branch';

export const saveBranch = createAction(
  '[Branch Form] Save Branch',
  props<{ branch: Branch }>()
);

export const saveBranchSuccess = createAction(
  '[Branch API] Save Branch Success',
  props<{ branch: Branch }>()
);

export const saveBranchFailure = createAction(
  '[Branch API] Save Branch Failure',
  props<{ error: any }>()
);

export const fetchBranchList = createAction(
  '[Branch List Api] Fetch Branch List'
);

export const fetchBranchListSuccess = createAction(
  '[Branch List Api] Fetch Branch List Success',
  props<BaseListResponse<Branch>>()
);

export const fetchBranchListError = createAction(
  '[Branch List Api] Fetch Branch List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Branch State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Branch State] Set Size',
  props<{ size: number }>()
);

export const deleteBranchById = createAction(
  '[Branch Api] Delete By Id',
  props<{ id: number }>()
);
