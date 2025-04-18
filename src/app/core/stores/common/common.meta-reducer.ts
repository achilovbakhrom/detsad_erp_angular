import { ActionReducer } from '@ngrx/store';
import {
  AUTH_STATE,
  APP_STATE,
  COMPANY_STATE,
  BRANCH_STATE,
  COMMON_STATE,
  GROUP_STATE,
  CHILD_STATE,
  REASON_STATE,
  POSITION_STATE,
  DEPARTMENT_STATE,
  PAYMENT_TYPE_STATE,
  EMPLOYEE_CONTRACT_STATE,
  EMPLOYEE_STATE,
  TRANSACTION_STATE,
  SICK_LEAVE_STATE,
  SALARY_STATE,
  ACCOUNT_STATE,
  SUBSCRIPTION_STATE,
  ACCOUNT_STATE_STATE,
} from '../../../constants';
import { pick } from 'ramda';
import { AppState } from '../types';

const WHITELIST = [
  AUTH_STATE,
  COMPANY_STATE,
  BRANCH_STATE,
  COMMON_STATE,
  GROUP_STATE,
  CHILD_STATE,
  REASON_STATE,
  POSITION_STATE,
  DEPARTMENT_STATE,
  PAYMENT_TYPE_STATE,
  EMPLOYEE_STATE,
  EMPLOYEE_CONTRACT_STATE,
  TRANSACTION_STATE,
  SICK_LEAVE_STATE,
  SALARY_STATE,
  ACCOUNT_STATE,
  SUBSCRIPTION_STATE,
  ACCOUNT_STATE_STATE,
] as const;

export function localStorageSyncReducer(
  reducer: ActionReducer<AppState>
): ActionReducer<AppState> {
  return (state, action) => {
    const nextState = reducer(state, action);

    const savingState = pick(WHITELIST, nextState);
    localStorage.setItem(APP_STATE, JSON.stringify(savingState));
    return nextState;
  };
}
