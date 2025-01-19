import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { savePaymentType } from '../../core/stores/payment-type/payment-type.actions';

@Component({
  selector: 'app-payment-type-form',
  standalone: false,

  templateUrl: './payment-type-form.component.html',
  styleUrl: './payment-type-form.component.scss',
})
export class PaymentTypeFormComponent {
  paymentTypeForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.paymentTypeForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    if (this.paymentTypeForm.valid) {
      const paymentTypeData = this.paymentTypeForm.value;
      this.store.dispatch(savePaymentType({ paymentType: paymentTypeData }));
    }
  }
}
