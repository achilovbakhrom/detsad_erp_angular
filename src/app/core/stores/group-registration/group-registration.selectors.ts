import { createFeatureSelector, createSelector } from '@ngrx/store';
import { GroupRegistrationState } from './group-registration.state';

export const selectGroupRegistrationState =
  createFeatureSelector<GroupRegistrationState>('groupRegistration');

export const selectValueFromState = <T>(
  fn: (state: GroupRegistrationState) => T
) =>
  createSelector<object, GroupRegistrationState, T>(
    selectGroupRegistrationState,
    fn
  );

export const selectGroupRegistration = selectValueFromState(
  (state: GroupRegistrationState) => state.groupRegistration
);

export const selectLoading = selectValueFromState(
  (state: GroupRegistrationState) => state.loading
);

export const selectError = selectValueFromState(
  (state: GroupRegistrationState) => state.error
);

export const selectGroupRegistrationList = selectValueFromState(
  (state: GroupRegistrationState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
