import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { ChildComponent } from './child.component';
import { ChildListComponent } from './child-list/child-list.component';
import { ChildFormComponent } from './child-form/child-form.component';

const routes: Routes = [
  {
    path: '',
    component: ChildComponent,
    children: [
      {
        path: '',
        component: ChildListComponent,
      },
      {
        path: 'create',
        component: ChildFormComponent,
      },
      {
        path: ':id/edit',
        component: ChildFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildRoutingModule {}
