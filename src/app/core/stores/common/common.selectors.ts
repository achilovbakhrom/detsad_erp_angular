import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CommonState } from './common.state';

export const selectCommonState = createFeatureSelector<CommonState>('common');

export const selectValueFromState = <T>(fn: (state: CommonState) => T) =>
  createSelector<object, CommonState, T>(selectCommonState, fn);

export const selectCompany = selectValueFromState(
  (state: CommonState) => state.company
);
