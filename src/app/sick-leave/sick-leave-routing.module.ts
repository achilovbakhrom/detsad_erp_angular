import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SickLeaveComponent } from './sick-leave.component';
import { SickLeaveListComponent } from './sick-leave-list/sick-leave-list.component';
import { SickLeaveFormComponent } from './sick-leave-form/sick-leave-form.component';

const routes: Routes = [
  {
    path: '',
    component: SickLeaveComponent,
    children: [
      {
        path: '',
        component: SickLeaveListComponent,
      },
      {
        path: 'create',
        component: SickLeaveFormComponent,
      },
      {
        path: ':id/edit',
        component: SickLeaveFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SickLeaveRouting {}
