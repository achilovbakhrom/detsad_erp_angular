import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';
import { Subscription, SubscriptionInput } from '../../../model/Subscription';

export const saveSubscription = createAction(
  '[Subscription Form] Save Subscription',
  props<{ subscription: SubscriptionInput }>()
);

export const saveSubscriptionSuccess = createAction(
  '[Subscription API] Save Subscription Success',
  props<{ subscription: Subscription }>()
);

export const saveSubscriptionError = createAction(
  '[Subscription API] Save Subscription Failure',
  props<{ error: any }>()
);

export const fetchSubscriptionList = createAction(
  '[Subscription List Api] Fetch Subscription List'
);

export const fetchSubscriptionSuccess = createAction(
  '[Subscription List Api] Fetch Subscription List Success',
  props<BaseListResponse<Subscription>>()
);

export const fetchSubscriptionError = createAction(
  '[Subscription List Api] Fetch Subscription List Error',
  props<{ error: any }>()
);

export const setPage = createAction(
  '[Subscription State] Set Page',
  props<{ page: number }>()
);

export const setSize = createAction(
  '[Subscription State] Set Size',
  props<{ size: number }>()
);

export const deleteSubscriptionById = createAction(
  '[Subscription Api] Delete By Id',
  props<{ id: number }>()
);

export const deleteSubscriptionSuccess = createAction(
  '[Subscription Api] Delete By Id Success'
);

export const deleteSubscriptionByIdError = createAction(
  '[Subscription Api] Delete By Id Error'
);
