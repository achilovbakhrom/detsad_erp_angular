import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ChildContractState } from './child-contract.state';

export const selectChildContractState =
  createFeatureSelector<ChildContractState>('childContract');

export const selectValueFromState = <T>(fn: (state: ChildContractState) => T) =>
  createSelector<object, ChildContractState, T>(selectChildContractState, fn);

export const selectChildContract = selectValueFromState(
  (state: ChildContractState) => state.childContract
);

export const selectLoading = selectValueFromState(
  (state: ChildContractState) => state.loading
);

export const selectError = selectValueFromState(
  (state: ChildContractState) => state.error
);

export const selectChildContractList = selectValueFromState(
  (state: ChildContractState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
