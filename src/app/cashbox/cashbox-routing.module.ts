import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CashboxComponent } from './cashbox.component';
import { CashboxListComponent } from './cashbox-list/cashbox-list.component';
import { CashboxFormComponent } from './cashbox-form/cashbox-form.component';

const routes: Routes = [
  {
    path: '',
    component: CashboxComponent,
    children: [
      {
        path: '',
        component: CashboxListComponent,
      },
      {
        path: 'create',
        component: CashboxFormComponent,
      },
      {
        path: ':id/edit',
        component: CashboxFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CashboxRoutingModule {}
