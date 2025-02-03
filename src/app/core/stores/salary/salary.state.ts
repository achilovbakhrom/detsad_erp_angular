import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Salary } from '../../../model/Salary';

export type SalaryState = BaseListState<Salary> & {
  salary: Nillable<Salary>;
  error: any;
};

export const initialState: SalaryState = {
  data: null,
  total: null,
  page: null,
  size: null,
  salary: null,
  loading: false,
  error: null,
};

export function getInitialSalaryState(): SalaryState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.salary || initialState;
}
