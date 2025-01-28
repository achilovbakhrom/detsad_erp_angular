import { Branch } from './Branch';
import { Child } from './Child';
import { GroupRegistration } from './GroupRegistration';
import { PaymentType } from './PaymentType';

export enum ChildContractStatus {
  Created = 'created',
  Active = 'active',
  Pending = 'pending',
}

export type ChildContract = {
  id?: number;
  date: string;
  branch: Branch;
  child: Child;
  subscription?: number;
  payment_type?: PaymentType;
  payment_date?: string;
  status?: ChildContractStatus;
  group_registration?: GroupRegistration;
  description?: string;
};

export type ChildContractInput = Omit<
  ChildContract,
  'branch' | 'child' | 'payment_type' | 'group_registration'
> & {
  branch: number;
  child: number;
  payment_type?: number;
  group_registration?: number;
};
