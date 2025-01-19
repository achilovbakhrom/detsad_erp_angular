import { BaseListState } from '../../../model/BaseListState';
import { Group } from '../../../model/Group';
import { Nillable } from '../../../model/nullable';

export type GroupState = BaseListState<Group> & {
  group: Nillable<Group>;
  error: any;
};

export const initialState: GroupState = {
  data: null,
  total: null,
  page: null,
  size: null,
  group: null,
  loading: false,
  error: null,
};

export function getInitialGroupState(): GroupState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.group || initialState;
}
