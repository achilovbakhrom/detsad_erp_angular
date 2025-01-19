import { AuthState } from './auth/auth.state';
import { BranchState } from './branch/branch.state';
import { ChildState } from './child/child.state';
import { CommonState } from './common/common.state';
import { CompanyState } from './company/company.state';
import { DepartmentState } from './department/department.state';
import { GroupState } from './group/group.state';
import { PaymentTypeState } from './payment-type/payment-type.state';
import { PositionState } from './position/position.state';
import { ReasonState } from './reason/reason.state';

export interface AppState {
  common: CommonState;
  auth: AuthState;
  company: CompanyState;
  branch: BranchState;
  group: GroupState;
  child: ChildState;
  position: PositionState;
  reason: ReasonState;
  department: DepartmentState;
  paymentType: PaymentTypeState;
}
