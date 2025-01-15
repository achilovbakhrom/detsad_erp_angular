import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full',
      },
      {
        path: 'main',
        loadChildren: () =>
          import('../main/main.module').then((m) => m.MainModule),
      },
      {
        path: 'company',
        loadChildren: () =>
          import('../company/company.module').then((m) => m.CompanyModule),
      },
      {
        path: 'branch',
        loadChildren: () =>
          import('../branch/branch.module').then((m) => m.BranchModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
