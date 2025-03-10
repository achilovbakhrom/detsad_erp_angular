import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubscriptionComponent } from './subscription.component';
import { SubscriptionFormComponent } from './subscription-form/subscription-form.component';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';
import { SubscriptionRoutingModule } from './subscription-routing.module';
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

@NgModule({
  declarations: [
    SubscriptionComponent,
    SubscriptionFormComponent,
    SubscriptionListComponent,
  ],
  imports: [
    CommonModule,
    SubscriptionRoutingModule,
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
export class SubscriptionModule {}
