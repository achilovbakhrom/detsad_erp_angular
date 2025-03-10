import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';

const routes: Routes = [
  {
    path: '',
    component: SubscriptionComponent,
    children: [
      {
        path: '',
        component: SubscriptionListComponent,
      },
      {
        path: 'create',
        component: SubscriptionFormComponent,
      },
      {
        path: ':id/edit',
        component: SubscriptionFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SubscriptionRoutingModule {}
