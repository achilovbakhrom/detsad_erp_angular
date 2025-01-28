import { Branch } from './Branch';
import { Group } from './Group';

export enum GroupRegistrationStatus {
  Created = 'created',
  Active = 'active',
}

export type GroupRegistration = {
  id?: number;
  date: string;
  group: Group;
  branch: Branch;
  status?: GroupRegistrationStatus;
  children: any[];
};

export type GroupRegistrationInput = Omit<
  GroupRegistration,
  'group' | 'branch'
> & { group: number; branch: number };
