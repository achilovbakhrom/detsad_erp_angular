import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import {
  ChildContract,
  ChildContractInput,
  ChildContractStatus,
} from '../../../model/ChildContract';

export const saveChildContract = createAction(
  '[Child Contract Form] Save Child Contract',
  props<{ childContract: ChildContractInput }>()
);

export const saveChildContractSuccess = createAction(
  '[Child Contract API] Save Child Contract Success',
  props<{ childContract: ChildContract }>()
);

export const saveChildContractError = createAction(
  '[Child Contract API] Save Child Contract Failure',
  props<{ error: any }>()
);

export const fetchChildContractList = createAction(
  '[Child Contract List Api] Fetch Child Contract List'
);

export const fetchChildContractListSuccess = createAction(
  '[Child Contract List Api] Fetch Child Contract List Success',
  props<BaseListResponse<ChildContract>>()
);

export const fetchChildContractListError = createAction(
  '[Child Contract List Api] Fetch Child Contract List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Child Contract State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Child Contract State] Set Size',
  props<{ size: number }>()
);

export const deleteChildContractById = createAction(
  '[Child Contract Api] Delete By Id',
  props<{ id: number }>()
);

export const deleteChildContractByIdSuccess = createAction(
  '[Child Contract Api] Delete By Id Success'
);

export const deleteChildContractByIdError = createAction(
  '[Child Contract Api] Delete By Id Error'
);

export const changeStatusById = createAction(
  '[Child Contract Api] Change Status By Id',
  props<{ id: number; status: ChildContractStatus }>()
);

export const changeStatusByIdSuccess = createAction(
  '[Child Contract Api] Change Status By Id Success'
);

export const changeStatusByIdError = createAction(
  '[Child Contract Api] Change Status By Id Error'
);
