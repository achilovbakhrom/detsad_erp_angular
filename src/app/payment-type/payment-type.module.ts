import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentTypeComponent } from './payment-type.component';
import { PaymentTypeFormComponent } from './payment-type-form/payment-type-form.component';
import { PaymentTypeListComponent } from './payment-type-list/payment-type-list.component';
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
import { PaymentTypeRoutingModule } from './payment-type-routing.module';

@NgModule({
  declarations: [
    PaymentTypeComponent,
    PaymentTypeFormComponent,
    PaymentTypeListComponent,
  ],
  imports: [
    CommonModule,
    PaymentTypeRoutingModule,
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
export class PaymentTypeModule {}
