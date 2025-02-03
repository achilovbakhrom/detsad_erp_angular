import { Company } from './company';
import { EmployeeContract } from './EmployeeContract';

export type Salary = {
  id?: number;
  date: string;
  employee: EmployeeContract;
  description?: string;
  company: Company;
};

export type SalaryInput = Omit<Salary, 'employee' | 'company'> & {
  employee: number;
  company?: number;
};
