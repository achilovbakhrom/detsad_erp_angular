import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PositionState } from './position.state';

export const selectPositionState =
  createFeatureSelector<PositionState>('position');

export const selectValueFromState = <T>(fn: (state: PositionState) => T) =>
  createSelector<object, PositionState, T>(selectPositionState, fn);

export const selectPosition = selectValueFromState(
  (state: PositionState) => state.position
);

export const selectLoading = selectValueFromState(
  (state: PositionState) => state.loading
);

export const selectError = selectValueFromState(
  (state: PositionState) => state.error
);

export const selectPositionList = selectValueFromState(
  (state: PositionState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
