import { AUTH_STATE } from '../../../constants';
import { Nullable } from '../../../model/nullable';
import { User } from '../../../model/user';

export interface AuthState {
  user: Nullable<User>;
  accessToken: Nullable<string>;
  refreshToken: Nullable<string>;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: Nullable<string>;
}

export const initialAuthState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

export function getInitialAuthState(): AuthState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.auth || initialAuthState;
}
