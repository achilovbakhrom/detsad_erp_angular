import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashboxComponent } from './cashbox.component';
import { CashboxFormComponent } from './cashbox-form/cashbox-form.component';
import { CashboxListComponent } from './cashbox-list/cashbox-list.component';
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
import { CashboxRoutingModule } from './cashbox-routing.module';

@NgModule({
  declarations: [CashboxComponent, CashboxFormComponent, CashboxListComponent],
  imports: [
    CommonModule,
    CashboxRoutingModule,
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
export class CashboxModule {}
