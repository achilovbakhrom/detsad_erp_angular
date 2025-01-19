import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Reason } from '../../../model/Reason';

export type ReasonState = BaseListState<Reason> & {
  reason: Nillable<Reason>;
  error: any;
};

export const initialState: ReasonState = {
  data: null,
  total: null,
  page: null,
  size: null,
  reason: null,
  loading: false,
  error: null,
};

export function getInitialReasonState(): ReasonState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.reason || initialState;
}
