import { createFeatureSelector, createSelector } from '@ngrx/store';
import { BranchState } from './branch.state';

export const selectBranchState = createFeatureSelector<BranchState>('branch');

export const selectValueFromState = <T>(fn: (state: BranchState) => T) =>
  createSelector<object, BranchState, T>(selectBranchState, fn);

export const selectBranch = selectValueFromState(
  (state: BranchState) => state.branch
);

export const selectLoading = selectValueFromState(
  (state: BranchState) => state.loading
);

export const selectError = selectValueFromState(
  (state: BranchState) => state.error
);

export const selectBranchList = selectValueFromState(
  (state: BranchState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
