import { Nillable } from './nullable';

export type TransformCompanyToBeSaved<T> = Omit<T, 'company'> & {
  company: Nillable<number>;
};
