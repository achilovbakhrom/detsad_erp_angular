import { RouterModule, Routes } from '@angular/router';
import { SalaryComponent } from './salary.component';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { SalaryFormComponent } from './salary-form/salary-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: SalaryComponent,
    children: [
      {
        path: '',
        component: SalaryListComponent,
      },
      {
        path: 'create',
        component: SalaryFormComponent,
      },
      {
        path: ':id/edit',
        component: SalaryFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryRoutingModule {}
