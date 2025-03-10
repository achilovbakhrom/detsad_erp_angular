import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ReportComponent } from './report.component';
import { AccountStateComponent } from './account-state/account-state.component';

const routes: Routes = [
  {
    path: '',
    component: ReportComponent,
    children: [
      {
        path: 'account-state',
        component: AccountStateComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportRoutingModule {}
