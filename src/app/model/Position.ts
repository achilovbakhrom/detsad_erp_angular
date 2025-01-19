import { Company } from './company';
import { Nillable, Nullable } from './nullable';

export type Position = {
  id?: number;
  title: Nullable<string>;
  company: Nillable<Company>;
};
