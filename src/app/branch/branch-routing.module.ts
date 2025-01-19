import { RouterModule, Routes } from '@angular/router';
import { BranchComponent } from './branch.component';
import { NgModule } from '@angular/core';
import { BranchListComponent } from './branch-list/branch-list.component';
import { BranchFormComponent } from './branch-form/branch-form.component';

const routes: Routes = [
  {
    path: '',
    component: BranchComponent,
    children: [
      {
        path: '',
        component: BranchListComponent,
      },
      {
        path: 'create',
        component: BranchFormComponent,
      },
      {
        path: ':id/edit',
        component: BranchFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchRoutingModule {}
