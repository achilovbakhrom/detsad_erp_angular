import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPickerComponent } from './components/company-picker/company-picker.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EmployeePickerComponent } from './components/employee-picker/employee-picker.component';
import { PositionPickerComponent } from './components/position-picker/position-picker.component';
import { DepartmentPickerComponent } from './components/department-picker/department-picker.component';
import { BranchPickerComponent } from './components/branch-picker/branch-picker.component';
import { ChildPickerComponent } from './components/child-picker/child-picker.component';
import { GroupPickerComponent } from './components/group-picker/group-picker.component';
import { GroupRegistrationPickerComponent } from './components/group-registration-picker/group-registration-picker.component';
import { PaymentTypePickerComponent } from './components/payment-type-picker/payment-type-picker.component';
import { ChildContractPickerComponent } from './components/child-contract-picker/child-contract-picker.component';
import { EmployeeContractPickerComponent } from './components/employee-contract-picker/employee-contract-picker.component';
import { ReasonPickerComponent } from './components/reason-picker/reason-picker.component';

@NgModule({
  declarations: [
    CompanyPickerComponent,
    EmployeePickerComponent,
    PositionPickerComponent,
    DepartmentPickerComponent,
    BranchPickerComponent,
    ChildPickerComponent,
    GroupPickerComponent,
    GroupRegistrationPickerComponent,
    PaymentTypePickerComponent,
    ChildContractPickerComponent,
    EmployeeContractPickerComponent,
    ReasonPickerComponent,
  ],
  imports: [
    CommonModule,
    NzAutocompleteModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  exports: [
    CompanyPickerComponent,
    EmployeePickerComponent,
    PositionPickerComponent,
    DepartmentPickerComponent,
    BranchPickerComponent,
    ChildPickerComponent,
    GroupPickerComponent,
    PaymentTypePickerComponent,
    GroupRegistrationPickerComponent,
    ChildContractPickerComponent,
    EmployeeContractPickerComponent,
    ReasonPickerComponent,
  ],
})
export class SharedModule {}
