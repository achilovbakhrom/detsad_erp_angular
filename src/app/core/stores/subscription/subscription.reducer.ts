import { createReducer, on } from '@ngrx/store';
import { getInitialSubscriptonState } from './subscription.state';
import {
  fetchSubscriptionError,
  fetchSubscriptionSuccess,
  saveSubscription,
  saveSubscriptionError,
  saveSubscriptionSuccess,
  setPage,
  setSize,
} from './subscription.actions';

export const subscriptionReducer = createReducer(
  getInitialSubscriptonState(),
  on(saveSubscription, (state) => ({
    ...state,
    loading: true,
  })),
  on(saveSubscriptionSuccess, (state, { subscription }) => ({
    ...state,
    loading: false,
    subscription,
    error: null,
  })),
  on(saveSubscriptionError, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(fetchSubscriptionSuccess, (state, response) => ({
    ...state,
    loading: false,
    total: response.count,
    data: response.results,
  })),
  on(fetchSubscriptionError, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(setPage, (state, { page }) => ({
    ...state,
    page: page,
  })),
  on(setSize, (state, { size }) => ({
    ...state,
    size: size,
  }))
);
