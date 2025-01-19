import { RouterModule, Routes } from '@angular/router';
import { PositionComponent } from './position.component';
import { PositionListComponent } from './position-list/position-list.component';
import { PositionFormComponent } from './position-form/position-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: PositionComponent,
    children: [
      {
        path: '',
        component: PositionListComponent,
      },
      {
        path: 'create',
        component: PositionFormComponent,
      },
      {
        path: ':id/edit',
        component: PositionFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PositionRoutingModule {}
