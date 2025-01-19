import { BaseListState } from '../../../model/BaseListState';
import { Child } from '../../../model/Child';
import { Nillable } from '../../../model/nullable';

export type ChildState = BaseListState<Child> & {
  child: Nillable<Child>;
  error: any;
};

export const initialState: ChildState = {
  data: null,
  total: null,
  page: null,
  size: null,
  child: null,
  loading: false,
  error: null,
};

export function getInitialChildState(): ChildState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.child || initialState;
}
