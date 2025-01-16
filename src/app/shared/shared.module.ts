import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyPickerComponent } from './components/company-picker/company-picker.component';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [CompanyPickerComponent],
  imports: [
    CommonModule,
    NzAutocompleteModule,
    NzInputModule,
    NzIconModule,
    FormsModule,
    CommonModule,
  ],
  exports: [CompanyPickerComponent],
})
export class SharedModule {}
