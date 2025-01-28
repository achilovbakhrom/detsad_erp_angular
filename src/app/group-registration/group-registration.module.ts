import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRegistrationFormComponent } from './group-registration-form/group-registration-form.component';
import { GroupRegistrationListComponent } from './group-registration-list/group-registration-list.component';
import { GroupRegistrationRoutingModule } from './group-registration-routing.module';
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

@NgModule({
  declarations: [
    GroupRegistrationFormComponent,
    GroupRegistrationListComponent,
  ],
  imports: [
    CommonModule,
    GroupRegistrationRoutingModule,
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
export class GroupRegistrationModule {}
