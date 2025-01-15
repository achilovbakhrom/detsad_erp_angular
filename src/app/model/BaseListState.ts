import { Nillable } from './nullable';

export type BaseListState<T> = {
  data: Nillable<T[]>;
  total: Nillable<number>;
  page: Nillable<number>;
  size: Nillable<number>;
  loading: boolean;
};
