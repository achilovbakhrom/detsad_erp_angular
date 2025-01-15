import { createAction, props } from '@ngrx/store';
import { LoginInput, LoginResponse } from '../../../model/login';

export const login = createAction('[Auth] Login', props<LoginInput>());

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<LoginResponse>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const logout = createAction('[Auth] Logout');

export const refreshToken = createAction('[Auth] Refresh Token');

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ accessToken: string }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: string }>()
);
