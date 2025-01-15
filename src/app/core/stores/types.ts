import { AuthState } from './auth/auth.state';
import { CompanyState } from './company/company.state';

export interface AppState {
  auth: AuthState;
  company: CompanyState;
}
