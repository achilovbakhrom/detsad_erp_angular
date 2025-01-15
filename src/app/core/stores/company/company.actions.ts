import { createAction, props } from '@ngrx/store';
import { Company } from '../../../model/company';
import { BaseListFilter } from '../../../model/BaseListFilter';
import { BaseListResponse } from '../../../model/BaseListResponse';

export const saveCompany = createAction(
  '[Company Form] Save Company',
  props<{ company: Company }>()
);

// Action for success after saving company
export const saveCompanySuccess = createAction(
  '[Company API] Save Company Success',
  props<{ company: Company }>()
);

// Action for failure after saving company
export const saveCompanyFailure = createAction(
  '[Company API] Save Company Failure',
  props<{ error: any }>()
);

export const fetchCompanyList = createAction(
  '[Company List Api] Fetch Company List'
);

export const fetchCompanyListSuccess = createAction(
  '[Company List Api] Fetch Company List Success',
  props<BaseListResponse<Company>>()
);

export const fetchCompanyListError = createAction(
  '[Company List Api] Fetch Company List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Company State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Company State] Set Size',
  props<{ size: number }>()
);

export const deleteCompanyById = createAction(
  '[Company Api] Delete By Id',
  props<{ id: number }>()
);
