import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';
import { Subscription } from '../../../model/Subscription';

export type SubscriptionState = BaseListState<Subscription> & {
  subscription: Nillable<Subscription>;
  error: any;
};

export const initialState: SubscriptionState = {
  data: null,
  total: null,
  page: null,
  size: 50,
  subscription: null,
  loading: false,
  error: null,
};

export function getInitialSubscriptonState(): SubscriptionState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.subscription || initialState;
}
