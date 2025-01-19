import { createAction, props } from '@ngrx/store';
import { Company } from '../../../model/company';
import { Nillable } from '../../../model/nullable';

export const setCompany = createAction(
  '[Common] Set Company',
  props<{ company: Nillable<Company> }>()
);
