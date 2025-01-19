import { Branch } from './Branch';
import { Department } from './Department';
import { Employee } from './Employee';
import { Position } from './Position';

export enum EmployeeContractStatus {
  Created = 'created',
  Active = 'active',
  Finished = 'finished',
}

export type EmployeeContract = {
  id?: number;
  date: string;
  employee: Employee;
  position: Position;
  department: Department;
  salary: number;
  branch: Branch;
  status?: EmployeeContractStatus;
};

export type EmployeeContractInput = Omit<
  EmployeeContract,
  'employee' | 'position' | 'department' | 'branch'
> & {
    employee: number
    position: number
    department: number
    branch: number
};
