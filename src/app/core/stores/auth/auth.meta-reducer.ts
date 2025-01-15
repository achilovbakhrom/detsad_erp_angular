import { ActionReducer } from '@ngrx/store';
import { AuthState } from './auth.state';
import { AUTH_STATE, APP_STATE } from '../../../constants';
import { pick } from 'ramda';
import { AppState } from '../types';

const WHITELIST = [AUTH_STATE] as const;

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
