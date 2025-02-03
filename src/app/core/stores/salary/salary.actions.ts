import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Salary, SalaryInput } from '../../../model/Salary';

export const saveSalary = createAction(
  '[Salary Form] Save Salary',
  props<{ salary: SalaryInput }>()
);

export const saveSalarySuccess = createAction(
  '[Salary API] Save Salary Success',
  props<{ salary: Salary }>()
);

export const saveSalaryError = createAction(
  '[Salary API] Save Salary Failure',
  props<{ error: any }>()
);

export const fetchSalaryList = createAction(
  '[Salary List Api] Fetch Salary List'
);

export const fetchSalarySuccess = createAction(
  '[Salary List Api] Fetch Salary List Success',
  props<BaseListResponse<Salary>>()
);

export const fetchSalaryError = createAction(
  '[Salary List Api] Fetch Salary List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Salary State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Salary State] Set Size',
  props<{ size: number }>()
);

export const deleteSalaryById = createAction(
  '[Salary Api] Delete By Id',
  props<{ id: number }>()
);

export const deleteSalarySuccess = createAction(
  '[Salary Api] Delete By Id Success'
);

export const deleteSalaryByIdError = createAction(
  '[Salary Api] Delete By Id Error'
);
