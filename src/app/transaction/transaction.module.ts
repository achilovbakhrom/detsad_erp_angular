import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionComponent } from './transaction.component';
import { TransactionFormComponent } from './transaction-form/transaction-form.component';
import { TransactionListComponent } from './transaction-list/transaction-list.component';
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
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { SharedModule } from '../shared/shared.module';
import { TransactionRoutingModule } from './transaction-routing.module';

@NgModule({
  declarations: [
    TransactionComponent,
    TransactionFormComponent,
    TransactionListComponent,
  ],
  imports: [
    CommonModule,
    TransactionRoutingModule,
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
    NzRadioModule,
    SharedModule,
  ],
})
export class TransactionModule {}
