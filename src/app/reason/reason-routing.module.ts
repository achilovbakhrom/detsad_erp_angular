import { RouterModule, Routes } from '@angular/router';
import { ReasonComponent } from './reason.component';
import { ReasonListComponent } from './reason-list/reason-list.component';
import { ReasonFormComponent } from './reason-form/reason-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: ReasonComponent,
    children: [
      {
        path: '',
        component: ReasonListComponent,
      },
      {
        path: 'create',
        component: ReasonFormComponent,
      },
      {
        path: ':id/edit',
        component: ReasonFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReasonRoutingModule {}
