import { Company } from './company';
import { Nillable } from './nullable';

export type Group = {
  id?: number;
  name: string;
  description: Nillable<string>;
  company: Company;
};
