import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import {
  GroupRegistration,
  GroupRegistrationInput,
  GroupRegistrationStatus,
} from '../../../model/GroupRegistration';
import { ChildContract } from '../../../model/ChildContract';

export const saveGroupRegistration = createAction(
  '[Group Registration Form] Save Group Registration',
  props<{ groupRegistration: GroupRegistrationInput }>()
);

export const updateGroupRegistration = createAction(
  '[Group Registration Form] Update Group Registration',
  props<{ id: number; groupRegistration: GroupRegistrationInput }>()
);

export const updateGroupRegistrationSuccess = createAction(
  '[Group Registration Form] Update Group Registration Success',
  props<{ groupRegistration: GroupRegistration }>()
);

export const updateGroupRegistrationError = createAction(
  '[Group Registration Form] Update Group Registration Error',
  props<{ error: any }>()
);

export const saveGroupRegistrationSuccess = createAction(
  '[Group Registration API] Save Group Registration Success',
  props<{ groupRegistration: GroupRegistration }>()
);

export const saveGroupRegistrationError = createAction(
  '[Group Registration API] Save Group Registration Failure',
  props<{ error: any }>()
);

export const fetchGroupRegistrationList = createAction(
  '[Group Registration List Api] Fetch Group Registration List'
);

export const fetchGroupRegistrationListSuccess = createAction(
  '[Group Registration List Api] Fetch Group Registration List Success',
  props<BaseListResponse<GroupRegistration>>()
);

export const fetchGroupRegistrationListError = createAction(
  '[Group Registration List Api] Fetch Group Registration List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Group Registration State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Group Registration State] Set Size',
  props<{ size: number }>()
);

export const deleteGroupRegistrationById = createAction(
  '[Group Registration Api] Delete By Id',
  props<{ id: number }>()
);

export const deleteGroupRegistrationByIdSuccess = createAction(
  '[Group Registration Api] Delete By Id Success'
);

export const deleteGroupRegistrationByIdError = createAction(
  '[Group Registration Api] Delete By Id Error'
);

export const changeStatusById = createAction(
  '[Group Registration Api] Change Status By Id',
  props<{ id: number; status: GroupRegistrationStatus }>()
);

export const changeStatusByIdSuccess = createAction(
  '[Group Registration Api] Change Status By Id Success'
);

export const changeStatusByIdError = createAction(
  '[Group Registration Api] Change Status By Id Error'
);

export const fetchChildContract = createAction(
  '[Child Contract Api] Fetch Child Contracts By Group Registraion Id',
  props<{ id: number }>()
);

export const fetchChildContractSuccess = createAction(
  '[Child Contract Api] Fetch Child Contracts By Group Registraion Id Success',
  props<{ childContracts: ChildContract[] }>()
);

export const fetchChildContractError = createAction(
  '[Child Contract Api] Fetch Child Contracts By Group Registraion Id Error',
  props<{ error: any }>()
);
