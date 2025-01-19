import { Nillable } from '../../../model/nullable';
import { Company } from '../../../model/company';

export type CommonState = {
  company: Nillable<Company>;
};

export const initialState: CommonState = {
  company: null,
};

export function getInitialCommonState(): CommonState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.common || initialState;
}
