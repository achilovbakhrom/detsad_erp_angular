import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report.component';
import { AccountStateComponent } from './account-state/account-state.component';
import { ReportRoutingModule } from './report-routing.module';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';

@NgModule({
  declarations: [ReportComponent, AccountStateComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NzGridModule,
    NzStatisticModule,
    NzCardModule,
    NzTableModule,
  ],
})
export class ReportModule {}
