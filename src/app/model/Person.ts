import { Nillable } from './nullable';

export type Person = {
  first_name: Nillable<string>;
  last_name: Nillable<string>;
  middle_name: Nillable<string>;
  date_of_birth: Nillable<string>;
  description: Nillable<string>;
};
