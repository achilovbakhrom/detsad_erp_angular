import { Company } from './company';
import { Nillable, Nullable } from './nullable';

export type PaymentType = {
  id?: number;
  name: Nullable<string>;
  company: Nillable<Company>;
};
