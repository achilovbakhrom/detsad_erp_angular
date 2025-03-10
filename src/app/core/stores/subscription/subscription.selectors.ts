import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SubscriptionState } from './subscription.state';

export const selectSubscriptionState =
  createFeatureSelector<SubscriptionState>('subscription');

export const selectValueFromState = <T>(fn: (state: SubscriptionState) => T) =>
  createSelector<object, SubscriptionState, T>(selectSubscriptionState, fn);

export const selectSubscription = selectValueFromState(
  (state: SubscriptionState) => state.subscription
);

export const selectLoading = selectValueFromState(
  (state: SubscriptionState) => state.loading
);

export const selectError = selectValueFromState(
  (state: SubscriptionState) => state.error
);

export const selectSubscriptionList = selectValueFromState(
  (state: SubscriptionState) => state.data
);

export const selectTotal = selectValueFromState((state) => state.total);

export const selectPage = selectValueFromState((state) => state.page);
export const selectSize = selectValueFromState((state) => state.size);
