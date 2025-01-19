import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaymentTypeComponent } from './payment-type.component';
import { PaymentTypeListComponent } from './payment-type-list/payment-type-list.component';
import { PaymentTypeFormComponent } from './payment-type-form/payment-type-form.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentTypeComponent,
    children: [
      {
        path: '',
        component: PaymentTypeListComponent,
      },
      {
        path: 'create',
        component: PaymentTypeFormComponent,
      },
      {
        path: ':id/edit',
        component: PaymentTypeFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaymentTypeRoutingModule {}
