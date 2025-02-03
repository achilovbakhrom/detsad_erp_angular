import { BaseListState } from '../../../model/BaseListState';
import { ChildContract } from '../../../model/ChildContract';
import { GroupRegistration } from '../../../model/GroupRegistration';
import { Nillable } from '../../../model/nullable';

export type GroupRegistrationState = BaseListState<GroupRegistration> & {
  groupRegistration: Nillable<GroupRegistration>;
  error: any;
  isActionGoing: boolean;
  childContracts: ChildContract[];
};

export const initialState: GroupRegistrationState = {
  data: null,
  total: null,
  page: null,
  size: null,
  groupRegistration: null,
  loading: false,
  error: null,
  isActionGoing: false,
  childContracts: [],
};

export function getInitialGroupRegistrationState(): GroupRegistrationState {
  const savedState = JSON.parse(localStorage.getItem('app') || '{}');
  return savedState.groupRegistration || initialState;
}
