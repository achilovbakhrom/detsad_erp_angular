import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { MainModule } from '../main/main.module';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MainModule,
    NzPageHeaderModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzFlexModule,
    NzMenuModule,
    NzSpaceModule,
    SharedModule
],
  bootstrap: [DashboardComponent],
})
export class DashboardModule {}
