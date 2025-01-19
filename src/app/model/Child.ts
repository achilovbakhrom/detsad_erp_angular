import { Company } from './company';
import { Person } from './Person';

export type Child = Person & { id?: number; company: Company };
