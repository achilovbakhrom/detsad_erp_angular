import { BaseListState } from '../../../model/BaseListState';
import { ChildContract } from '../../../model/ChildContract';
import { Nillable } from '../../../model/nullable';

export type ChildContractState = BaseListState<ChildContract> & {
  childContract: Nillable<ChildContract>;
  error: any;
  isActionGoing: boolean;
};

export const initialState: ChildContractState = {
  data: null,
  total: null,
  page: null,
  size: null,
  childContract: null,
  loading: false,
  error: null,
  isActionGoing: false,
};

export function getInitialChildContractState(): ChildContractState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.childContract || initialState;
}
