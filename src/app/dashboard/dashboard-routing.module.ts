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
      {
        path: 'group',
        loadChildren: () =>
          import('../group/group.module').then((m) => m.GroupModule),
      },
      {
        path: 'child',
        loadChildren: () =>
          import('../child/child.module').then((m) => m.ChildModule),
      },
      {
        path: 'position',
        loadChildren: () =>
          import('../position/position.module').then((m) => m.PositionModule),
      },
      {
        path: 'reason',
        loadChildren: () =>
          import('../reason/reason.module').then((m) => m.ReasonModule),
      },
      {
        path: 'department',
        loadChildren: () =>
          import('../department/department.module').then(
            (m) => m.DepartmentModule
          ),
      },
      {
        path: 'payment-type',
        loadChildren: () =>
          import('../payment-type/payment-type.module').then(
            (m) => m.PaymentTypeModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
