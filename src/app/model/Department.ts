import { Company } from './company';
import { Nillable, Nullable } from './nullable';

export type Department = {
  id?: number;
  title: Nullable<string>;
  company: Nillable<Company>;
};
