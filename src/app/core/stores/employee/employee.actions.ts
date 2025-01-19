import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Employee } from '../../../model/Employee';

export const saveEmployee = createAction(
  '[Employee Form] Save Employee',
  props<{ employee: Employee }>()
);

export const saveEmployeeSuccess = createAction(
  '[Employee API] Save Employee Success',
  props<{ employee: Employee }>()
);

export const saveEmployeeFailure = createAction(
  '[Employee API] Save Employee Failure',
  props<{ error: any }>()
);

export const fetchEmployeeList = createAction(
  '[Employee List Api] Fetch Employee List'
);

export const fetchEmployeeListSuccess = createAction(
  '[Employee List Api] Fetch Employee List Success',
  props<BaseListResponse<Employee>>()
);

export const fetchEmployeeListError = createAction(
  '[Employee List Api] Fetch Employee List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Employee State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Employee State] Set Size',
  props<{ size: number }>()
);

export const deleteEmployeeById = createAction(
  '[Employee Api] Delete By Id',
  props<{ id: number }>()
);
