import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Branch } from '../../../model/Branch';

export type BranchState = BaseListState<Branch> & {
  branch: Nillable<Branch>;
  error: any;
};

export const initialState: BranchState = {
  data: null,
  total: null,
  page: null,
  size: null,
  branch: null,
  loading: false,
  error: null,
};

export function getInitialBranchState(): BranchState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.branch || initialState;
}
