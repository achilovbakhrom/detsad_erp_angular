import { RouterModule, Routes } from '@angular/router';
import { EmployeeContractComponent } from './employee-contract.component';
import { EmployeeContractListComponent } from './employee-contract-list/employee-contract-list.component';
import { EmployeeContractFormComponent } from './employee-contract-form/employee-contract-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: EmployeeContractComponent,
    children: [
      {
        path: '',
        component: EmployeeContractListComponent,
      },
      {
        path: 'create',
        component: EmployeeContractFormComponent,
      },
      {
        path: ':id/edit',
        component: EmployeeContractFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeContractRoutingModule {}
