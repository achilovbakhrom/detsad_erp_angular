import { Nillable } from './nullable';

export type BaseListResponse<T> = {
  count: number;
  next: Nillable<string>;
  previous: Nillable<string>;
  results: T[];
};
