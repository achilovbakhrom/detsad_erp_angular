import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SickLeaveFormComponent } from './sick-leave-form/sick-leave-form.component';
import { SickLeaveListComponent } from './sick-leave-list/sick-leave-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFlexModule } from 'ng-zorro-antd/flex';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { SharedModule } from '../shared/shared.module';
import { SickLeaveRouting } from './sick-leave-routing.module';

@NgModule({
  declarations: [SickLeaveFormComponent, SickLeaveListComponent],
  imports: [
    CommonModule,
    SickLeaveRouting,
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
    NzAutocompleteModule,
    SharedModule,
  ],
})
export class SickLeaveModule {}
