import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Department } from '../../../model/Department';

export type DepartmentState = BaseListState<Department> & {
  department: Nillable<Department>;
  error: any;
};

export const initialState: DepartmentState = {
  data: null,
  total: null,
  page: null,
  size: null,
  department: null,
  loading: false,
  error: null,
};

export function getInitialDepartmentState(): DepartmentState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.department || initialState;
}
