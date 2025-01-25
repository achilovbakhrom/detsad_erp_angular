import { Company } from './company';
import { Person } from './Person';

export type Employee = Person & { id?: number; company: Company };
