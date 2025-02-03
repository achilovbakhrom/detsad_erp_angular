import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { DatePipe } from '@angular/common';
import { saveCashbox } from '../../core/stores/cashbox/cashbox.actions';

@Component({
  selector: 'app-cashbox-form',
  standalone: false,

  templateUrl: './cashbox-form.component.html',
  styleUrl: './cashbox-form.component.scss',
  providers: [DatePipe],
})
export class CashboxFormComponent {
  cashboxForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.cashboxForm = this.fb.group({
      date: ['', [Validators.required]],
      amount: [0, [Validators.required]],
      payment_type: [false, [Validators.required]],
      reason: [null, [Validators.required]],
      description: ['', [Validators.required]],
      transaction_type: [null, [Validators.required]],
      child: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.cashboxForm.valid) {
      const childContractData = this.cashboxForm.value;

      this.store.dispatch(
        saveCashbox({
          cashbox: {
            date:
              this.datePipe.transform(childContractData.date, 'yyyy-MM-dd') ??
              '',
            amount: childContractData.amount,
            payment_type: childContractData.payment_type.id,
            reason: childContractData.reason.id,
            description: childContractData.description,
            transaction_type: childContractData.transaction_type,
            child: childContractData.child.id,
          },
        })
      );
    }
  }
}
