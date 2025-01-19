import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReasonComponent } from './reason.component';
import { ReasonFormComponent } from './reason-form/reason-form.component';
import { ReasonListComponent } from './reason-list/reason-list.component';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { SharedModule } from '../shared/shared.module';
import { ReasonRoutingModule } from './reason-routing.module';

@NgModule({
  declarations: [ReasonComponent, ReasonFormComponent, ReasonListComponent],
  imports: [
    CommonModule,
    ReasonRoutingModule,
    ReactiveFormsModule,
    NzFlexModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzPopconfirmModule,
    SharedModule,
  ],
})
export class ReasonModule {}
