import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ReasonState } from './reason.state';

export const selectReasonState = createFeatureSelector<ReasonState>('reason');

export const selectValueFromState = <T>(fn: (state: ReasonState) => T) =>
  createSelector<object, ReasonState, T>(selectReasonState, fn);

export const selectReason = selectValueFromState(
  (state: ReasonState) => state.reason
);

export const selectLoading = selectValueFromState(
  (state: ReasonState) => state.loading
);

export const selectError = selectValueFromState(
  (state: ReasonState) => state.error
);

export const selectReasonList = selectValueFromState(
  (state: ReasonState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
