import { Routes } from '@angular/router';
import { EmployeeContractComponent } from './employee-contract.component';
import { EmployeeContractListComponent } from './employee-contract-list/employee-contract-list.component';
import { EmployeeContractFormComponent } from './employee-contract-form/employee-contract-form.component';

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
