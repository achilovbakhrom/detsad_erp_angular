import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChildState } from './child.state';

export const selectChildState = createFeatureSelector<ChildState>('child');

export const selectValueFromState = <T>(fn: (state: ChildState) => T) =>
  createSelector<object, ChildState, T>(selectChildState, fn);

export const selectChild = selectValueFromState(
  (state: ChildState) => state.child
);

export const selectLoading = selectValueFromState(
  (state: ChildState) => state.loading
);

export const selectError = selectValueFromState(
  (state: ChildState) => state.error
);

export const selectChildList = selectValueFromState(
  (state: ChildState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
