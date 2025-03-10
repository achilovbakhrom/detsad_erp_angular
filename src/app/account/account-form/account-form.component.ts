import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { saveAccount } from '../../core/stores/account/account.actions';

@Component({
  selector: 'app-account-form',
  standalone: false,

  templateUrl: './account-form.component.html',
  styleUrl: './account-form.component.scss',
})
export class AccountFormComponent implements OnInit {
  accountForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit() {
    this.accountForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    if (this.accountForm.valid) {
      const accountData = this.accountForm.value;
      this.store.dispatch(saveAccount({ account: accountData }));
    }
  }
}
