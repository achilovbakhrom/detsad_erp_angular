import { createReducer, on } from '@ngrx/store';
import { getInitialCommonState } from './common.state';
import { setCompany } from './common.actions';

export const commonReducer = createReducer(
  getInitialCommonState(),
  on(setCompany, (state, { company }) => ({
    ...state,
    company,
  }))
);
