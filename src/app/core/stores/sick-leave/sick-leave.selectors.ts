import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SickLeaveState } from './sick-leave.state';

export const selectSickLeaveState =
  createFeatureSelector<SickLeaveState>('sickLeave');

export const selectValueFromState = <T>(fn: (state: SickLeaveState) => T) =>
  createSelector<object, SickLeaveState, T>(selectSickLeaveState, fn);

export const selectSickLeave = selectValueFromState(
  (state: SickLeaveState) => state.sickLeave
);

export const selectLoading = selectValueFromState(
  (state: SickLeaveState) => state.loading
);

export const selectError = selectValueFromState(
  (state: SickLeaveState) => state.error
);

export const selectSickLeaveList = selectValueFromState(
  (state: SickLeaveState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
