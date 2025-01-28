import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import {
  EmployeeContract,
  EmployeeContractInput,
} from '../../../model/EmployeeContract';

export const saveEmployeeContract = createAction(
  '[Employee Contract Form] Save Employee',
  props<{ employeeContract: EmployeeContractInput }>()
);

export const saveEmployeeContractSuccess = createAction(
  '[Employee Contract API] Save Employee Contract Success',
  props<{ employeeContract: EmployeeContract }>()
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
  props<BaseListResponse<EmployeeContract>>()
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

export const deleteEmployeeContractByIdSuccess = createAction(
  '[Employee Contract Api] Delete By Id Success'
);

export const deleteEmployeeContractByIdError = createAction(
  '[Employee Contract Api] Delete By Id Error'
);

export const fireEmployeeByContractId = createAction(
  '[Employee Contract Api] Fire By Id',
  props<{ id: number }>()
);

export const fireEmployeeByContractIdSuccess = createAction(
  '[Employee Contract Api] Fire By Id Success'
);

export const fireEmployeeByContractIdError = createAction(
  '[Employee Contract Api] Fire By Id Error'
);

export const hireEmployeeByContractId = createAction(
  '[Employee Contract Api] Hire By Id',
  props<{ id: number }>()
);

export const hireEmployeeByContractIdSuccess = createAction(
  '[Employee Contract Api] Hire By Id Success'
);

export const hireEmployeeByContractIdError = createAction(
  '[Employee Contract Api] Hire By Id Error'
);
