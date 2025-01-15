import { Company } from '../../../model/company';
import { BaseListState } from '../../../model/BaseListState';
import { Nillable } from '../../../model/nullable';

export type CompanyState = BaseListState<Company> & {
  company: Nillable<Company>;
  error: any;
};

export const initialState: CompanyState = {
  data: null,
  total: null,
  page: null,
  size: null,
  company: null,
  loading: false,
  error: null,
};

export function getInitialCompanyState(): CompanyState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.company || initialState;
}
