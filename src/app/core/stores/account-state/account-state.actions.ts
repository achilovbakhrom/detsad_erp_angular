import { createAction, props } from '@ngrx/store';
import { BaseListResponse } from '../../../model/BaseListResponse';

import { AccountState } from '../../../model/AccountState';

export const fetchAccountState = createAction(
  '[Account State Api] Fetch Account State'
);

export const fetchAccountStateSuccess = createAction(
  '[Account State Api] Fetch Account State Success',
  props<AccountState>()
);

export const fetchAccountStateError = createAction(
  '[Account State Api] Fetch Account State Error',
  props<{ error: any }>()
);
