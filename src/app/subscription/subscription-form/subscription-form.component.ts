import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { saveSubscription } from '../../core/stores/subscription/subscription.actions';

@Component({
  selector: 'app-subscription-form',
  standalone: false,

  templateUrl: './subscription-form.component.html',
  styleUrl: './subscription-form.component.scss',
  providers: [DatePipe],
})
export class SubscriptionFormComponent {
  subscriptionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.subscriptionForm = this.fb.group({
      date: ['', [Validators.required]],
      child: [null, [Validators.required]],
      amount: [0, [Validators.required]],
      payment_type: [null, [Validators.required]],
      account: [null, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.subscriptionForm.valid) {
      const subscriptionData = this.subscriptionForm.value;

      this.store.dispatch(
        saveSubscription({
          subscription: {
            date:
              this.datePipe.transform(subscriptionData.date, 'yyyy-MM-dd') ??
              '',
            child: subscriptionData.child.id,
            amount: subscriptionData.amount,
            payment_type: subscriptionData.payment_type.id,
            account: subscriptionData.account.id,
            description: subscriptionData.description,
          },
        })
      );
    }
  }
}
