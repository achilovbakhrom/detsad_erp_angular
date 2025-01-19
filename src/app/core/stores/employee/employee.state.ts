import { BaseListState } from '../../../model/BaseListState';
import { Employee } from '../../../model/Employee';
import { Nillable } from '../../../model/nullable';

export type EmployeeState = BaseListState<Employee> & {
  employee: Nillable<Employee>;
  error: any;
};

export const initialState: EmployeeState = {
  data: null,
  total: null,
  page: null,
  size: null,
  employee: null,
  loading: false,
  error: null,
};

export function getInitialEmployeeState(): EmployeeState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.employee || initialState;
}
