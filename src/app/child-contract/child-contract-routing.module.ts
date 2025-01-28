import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ChildContractComponent } from './child-contract.component';
import { ChildContractListComponent } from './child-contract-list/child-contract-list.component';
import { ChildContractFormComponent } from './child-contract-form/child-contract-form.component';

const routes: Routes = [
  {
    path: '',
    component: ChildContractComponent,
    children: [
      {
        path: '',
        component: ChildContractListComponent,
      },
      {
        path: 'create',
        component: ChildContractFormComponent,
      },
      {
        path: ':id/edit',
        component: ChildContractFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildContractRoutingModule {}
