import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { SharedModule } from '../shared/shared.module';
import { ChildRoutingModule } from './child-routing.module';
import { ChildComponent } from './child.component';
import { ChildFormComponent } from './child-form/child-form.component';
import { ChildListComponent } from './child-list/child-list.component';

@NgModule({
  declarations: [ChildComponent, ChildFormComponent, ChildListComponent],
  imports: [
    CommonModule,
    ChildRoutingModule,
    ReactiveFormsModule,
    NzFlexModule,
    NzButtonModule,
    NzTableModule,
    NzDividerModule,
    NzFormModule,
    NzInputModule,
    NzCheckboxModule,
    NzPopconfirmModule,
    NzDatePickerModule,
    SharedModule,
  ],
})
export class ChildModule {}
