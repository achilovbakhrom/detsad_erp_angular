import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account.component';
import { AccountListComponent } from './account-list/account-list.component';
import { AccountFormComponent } from './account-form/account-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
    children: [
      {
        path: '',
        component: AccountListComponent,
      },
      {
        path: 'create',
        component: AccountFormComponent,
      },
      {
        path: ':id/edit',
        component: AccountFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccountRoutingModule {}
