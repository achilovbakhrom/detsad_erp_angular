import { Nillable } from './nullable';

export type BaseListFilter = {
  page: Nillable<number>;
  size: Nillable<number>;
  search?: Nillable<string>;
  company?: Nillable<number>;
};
