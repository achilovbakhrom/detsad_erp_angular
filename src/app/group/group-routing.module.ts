import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from './group.component';
import { GroupListComponent } from './group-list/group-list.component';
import { GroupFormComponent } from './group-form/group-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: GroupComponent,
    children: [
      {
        path: '',
        component: GroupListComponent,
      },
      {
        path: 'create',
        component: GroupFormComponent,
      },
      {
        path: ':id/edit',
        component: GroupFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
