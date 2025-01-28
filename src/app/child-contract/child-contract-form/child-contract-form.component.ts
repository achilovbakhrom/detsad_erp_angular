import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import { saveChildContract } from '../../core/stores/child-contract/child-contract.actions';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-child-contract-form',
  standalone: false,

  templateUrl: './child-contract-form.component.html',
  styleUrl: './child-contract-form.component.scss',
  providers: [DatePipe],
})
export class ChildContractFormComponent {
  childContractForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.childContractForm = this.fb.group({
      date: ['', [Validators.required]],
      branch: [null, [Validators.required]],
      child: [null, [Validators.required]],
      subscription: [0, [Validators.required]],
      payment_type: [null, [Validators.required]],
      payment_date: [null, [Validators.required]],
      group_registration: [null, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.childContractForm.valid) {
      const childContractData = this.childContractForm.value;

      this.store.dispatch(
        saveChildContract({
          childContract: {
            date:
              this.datePipe.transform(childContractData.date, 'yyyy-MM-dd') ??
              '',
            branch: childContractData.branch.id,
            child: childContractData.child.id,
            subscription: childContractData.subscription,
            payment_type: childContractData.payment_type.id,
            payment_date:
              this.datePipe.transform(
                childContractData.payment_date,
                'yyyy-MM-dd'
              ) ?? '',
            group_registration: childContractData.group_registration.id,
            description: childContractData.description,
          },
        })
      );
    }
  }
}
