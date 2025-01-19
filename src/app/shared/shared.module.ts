import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPickerComponent } from './components/company-picker/company-picker.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { EmployeePickerComponent } from './components/employee-picker/employee-picker.component';
import { PositionPickerComponent } from './components/position-picker/position-picker.component';
import { DepartmentPickerComponent } from './components/department-picker/department-picker.component';
import { BranchPickerComponent } from './components/branch-picker/branch-picker.component';
import { ChildPickerComponent } from './components/child-picker/child-picker.component';
import { GroupPickerComponent } from './components/group-picker/group-picker.component';

@NgModule({
  declarations: [CompanyPickerComponent, EmployeePickerComponent, PositionPickerComponent, DepartmentPickerComponent, BranchPickerComponent, ChildPickerComponent, GroupPickerComponent],
  imports: [
    CommonModule,
    NzAutocompleteModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    CommonModule,
  ],
  exports: [CompanyPickerComponent],
})
export class SharedModule {}
