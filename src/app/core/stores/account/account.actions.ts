import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Account } from '../../../model/Account';

export const saveAccount = createAction(
  '[Account Form] Save Account',
  props<{ account: Account }>()
);

export const saveAccountSuccess = createAction(
  '[Account API] Save Account Success',
  props<{ account: Account }>()
);

export const saveAccountFailure = createAction(
  '[Account API] Save Account Failure',
  props<{ error: any }>()
);

export const fetchAccountList = createAction(
  '[Account List Api] Fetch Account List'
);

export const fetchAccountListSuccess = createAction(
  '[Account List Api] Fetch Account List Success',
  props<BaseListResponse<Account>>()
);

export const fetchAccountListError = createAction(
  '[Account List Api] Fetch Account List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Account State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Account State] Set Size',
  props<{ size: number }>()
);

export const deleteAccountById = createAction(
  '[Account Api] Delete By Id',
  props<{ id: number }>()
);
