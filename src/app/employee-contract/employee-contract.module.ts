import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeContractComponent } from './employee-contract.component';
import { EmployeeContractFormComponent } from './employee-contract-form/employee-contract-form.component';
import { EmployeeContractListComponent } from './employee-contract-list/employee-contract-list.component';
import { EmployeeContractRoutingModule } from './employee-contract-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { SharedModule } from '../shared/shared.module';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

@NgModule({
  declarations: [
    EmployeeContractComponent,
    EmployeeContractFormComponent,
    EmployeeContractListComponent,
  ],
  imports: [
    CommonModule,
    EmployeeContractRoutingModule,
    ReactiveFormsModule,
    NzFlexModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    NzAutocompleteModule,
    SharedModule,
  ],
})
export class EmployeeContractModule {}
