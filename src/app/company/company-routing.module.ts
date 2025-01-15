import { RouterModule, Routes } from '@angular/router';
import { CompanyComponent } from './company.component';
import { NgModule } from '@angular/core';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyFormComponent } from './company-form/company-form.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: '',
        component: CompanyListComponent,
      },
      {
        path: 'create',
        component: CompanyFormComponent,
      },
      {
        path: ':id/edit',
        component: CompanyFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompanyRoutingModule {}
