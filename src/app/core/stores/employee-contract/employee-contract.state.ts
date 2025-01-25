import { BaseListState } from '../../../model/BaseListState';
import { EmployeeContract } from '../../../model/EmployeeContract';
import { Nillable } from '../../../model/nullable';

export type EmployeeContractState = BaseListState<EmployeeContract> & {
  employee: Nillable<EmployeeContract>;
  error: any;
  isActionGoing: boolean;
};

export const initialState: EmployeeContractState = {
  data: null,
  total: null,
  page: null,
  size: null,
  employee: null,
  loading: false,
  error: null,
  isActionGoing: false,
};

export function getInitialEmployeeContractState(): EmployeeContractState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.employeeContract || initialState;
}
