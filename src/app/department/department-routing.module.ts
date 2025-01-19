import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { DepartmentComponent } from './department.component';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentFormComponent } from './department-form/department-form.component';

const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
    children: [
      {
        path: '',
        component: DepartmentListComponent,
      },
      {
        path: 'create',
        component: DepartmentFormComponent,
      },
      {
        path: ':id/edit',
        component: DepartmentFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartmentRoutingModule {}
