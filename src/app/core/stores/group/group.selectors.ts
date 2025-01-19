import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupState } from './group.state';

export const selectGroupState = createFeatureSelector<GroupState>('group');

export const selectValueFromState = <T>(fn: (state: GroupState) => T) =>
  createSelector<object, GroupState, T>(selectGroupState, fn);

export const selectGroup = selectValueFromState(
  (state: GroupState) => state.group
);

export const selectLoading = selectValueFromState(
  (state: GroupState) => state.loading
);

export const selectError = selectValueFromState(
  (state: GroupState) => state.error
);

export const selectGroupList = selectValueFromState(
  (state: GroupState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
