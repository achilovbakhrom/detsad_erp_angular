import { AuthState } from './auth/auth.state';
import { BranchState } from './branch/branch.state';
import { CashboxState } from './cashbox/cashbox.state';
import { ChildContractState } from './child-contract/child-contract.state';
import { ChildState } from './child/child.state';
import { CommonState } from './common/common.state';
import { CompanyState } from './company/company.state';
import { DepartmentState } from './department/department.state';
import { EmployeeContractState } from './employee-contract/employee-contract.state';
import { EmployeeState } from './employee/employee.state';
import { GroupRegistrationState } from './group-registration/group-registration.state';
import { GroupState } from './group/group.state';
import { PaymentTypeState } from './payment-type/payment-type.state';
import { PositionState } from './position/position.state';
import { ReasonState } from './reason/reason.state';
import { SalaryState } from './salary/salary.state';
import { SickLeaveState } from './sick-leave/sick-leave.state';

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
  employee: EmployeeState;
  employeeContract: EmployeeContractState;
  groupRegistration: GroupRegistrationState;
  childContract: ChildContractState;
  cashbox: CashboxState;
  sickLeave: SickLeaveState;
  salary: SalaryState;
}
