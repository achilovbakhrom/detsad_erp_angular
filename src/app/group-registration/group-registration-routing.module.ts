import { RouterModule, Routes } from '@angular/router';
import { GroupRegistrationComponent } from './group-registration.component';
import { GroupRegistrationListComponent } from './group-registration-list/group-registration-list.component';
import { GroupRegistrationFormComponent } from './group-registration-form/group-registration-form.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: GroupRegistrationComponent,
    children: [
      {
        path: '',
        component: GroupRegistrationListComponent,
      },
      {
        path: 'create',
        component: GroupRegistrationFormComponent,
      },
      {
        path: ':id/edit',
        component: GroupRegistrationFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRegistrationRoutingModule {}
