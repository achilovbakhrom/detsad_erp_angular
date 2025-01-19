import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Employee } from '../../../model/Employee';

export const saveEmployeeContract = createAction(
  '[Employee Contract Form] Save Employee',
  props<{ employeeContract: Employee }>()
);

export const saveEmployeeContractSuccess = createAction(
  '[Employee Contract API] Save Employee Contract Success',
  props<{ employeeContract: Employee }>()
);

export const saveEmployeeContractFailure = createAction(
  '[Employee Contract API] Save Employee Contract Failure',
  props<{ error: any }>()
);

export const fetchEmployeeContractList = createAction(
  '[Employee Contract List Api] Fetch Employee Contract List'
);

export const fetchEmployeeContractListSuccess = createAction(
  '[Employee Contract List Api] Fetch Employee Contract List Success',
  props<BaseListResponse<Employee>>()
);

export const fetchEmployeeContractListError = createAction(
  '[Employee Contract List Api] Fetch Employee Contract List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Employee Contract State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Employee Contract State] Set Size',
  props<{ size: number }>()
);

export const deleteEmployeeContractById = createAction(
  '[Employee Contract Api] Delete By Id',
  props<{ id: number }>()
);
