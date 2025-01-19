import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeContractComponent } from './employee-contract.component';
import { EmployeeContractFormComponent } from './employee-contract-form/employee-contract-form.component';
import { EmployeeContractListComponent } from './employee-contract-list/employee-contract-list.component';



@NgModule({
  declarations: [
    EmployeeContractComponent,
    EmployeeContractFormComponent,
    EmployeeContractListComponent
  ],
  imports: [
    CommonModule
  ]
})
export class EmployeeContractModule { }
