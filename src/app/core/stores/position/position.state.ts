import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Position } from '../../../model/Position';

export type PositionState = BaseListState<Position> & {
  position: Nillable<Position>;
  error: any;
};

export const initialState: PositionState = {
  data: null,
  total: null,
  page: null,
  size: null,
  position: null,
  loading: false,
  error: null,
};

export function getInitialPositionState(): PositionState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.position || initialState;
}
