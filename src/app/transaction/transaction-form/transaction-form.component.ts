import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { DatePipe } from '@angular/common';
import { saveTransaction } from '../../core/stores/transaction/transaction.actions';

@Component({
  selector: 'app-transaction-form',
  standalone: false,

  templateUrl: './transaction-form.component.html',
  styleUrl: './transaction-form.component.scss',
  providers: [DatePipe],
})
export class TransactionFormComponent {
  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.transactionForm = this.fb.group({
      date: ['', [Validators.required]],
      transaction_type: ['income', [Validators.required]],
      amount: [0, [Validators.required]],
      payment_type: [null, [Validators.required]],
      account: [null, [Validators.required]],
      reason: [null, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.transactionForm.valid) {
      const transactionData = this.transactionForm.value;

      this.store.dispatch(
        saveTransaction({
          transaction: {
            date:
              this.datePipe.transform(transactionData.date, 'yyyy-MM-dd') ?? '',
            amount: transactionData.amount,
            payment_type: transactionData.payment_type.id,
            account: transactionData.account.id,
            reason: transactionData.reason.id,
            description: transactionData.description,
            transaction_type: transactionData.transaction_type,
          },
        })
      );
    }
  }
}
