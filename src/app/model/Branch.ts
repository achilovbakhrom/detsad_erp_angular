import { Company } from './company';

export type Branch = {
  id?: number;
  name: string;
  address?: string;
  description?: string;
  company: Company;
};

export type BranchInput = Branch & {
  company: number;
};
