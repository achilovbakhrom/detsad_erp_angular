import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { SickLeave } from '../../../model/SickLeave';

export type SickLeaveState = BaseListState<SickLeave> & {
  sickLeave: Nillable<SickLeave>;
  error: any;
};

export const initialState: SickLeaveState = {
  data: null,
  total: null,
  page: null,
  size: null,
  sickLeave: null,
  loading: false,
  error: null,
};

export function getInitialSickLeaveState(): SickLeaveState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.sickLeave || initialState;
}
