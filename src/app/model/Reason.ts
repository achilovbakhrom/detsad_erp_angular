import { Company } from './company';
import { Nillable, Nullable } from './nullable';

export type Reason = {
  id?: number;
  title: Nullable<string>;
  company: Nillable<Company>;
};
