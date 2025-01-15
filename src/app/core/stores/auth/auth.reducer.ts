import { createReducer, on } from '@ngrx/store';
import { getInitialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  getInitialAuthState(),
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
  })),
  on(
    AuthActions.loginSuccess,
    (state, { access: access_token, refresh: refresh_token }) => ({
      ...state,
      isAuthenticated: true,
      accessToken: access_token,
      refreshToken: refresh_token,
      isLoading: false,
    })
  ),
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    error: error,
    isAuthenticated: false,
    isLoading: false,
  })),
  on(AuthActions.refreshTokenSuccess, (state, { accessToken }) => ({
    ...state,
    accessToken,
  })),
  on(AuthActions.refreshTokenFailure, () => ({ ...getInitialAuthState() }))
);
