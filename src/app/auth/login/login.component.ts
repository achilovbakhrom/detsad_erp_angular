import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { login } from '../../core/stores/auth/auth.actions';
import { Observable } from 'rxjs';
import {
  selectAuthError,
  selectIsLoading,
} from '../../core/stores/auth/auth.selectors';
import { Nullable } from '../../model/nullable';

@Component({
  selector: 'app-login',
  standalone: false,

  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  isLoading$: Observable<boolean>;
  error$: Observable<Nullable<string>>;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {
    this.isLoading$ = store.pipe(select(selectIsLoading));
    this.error$ = store.pipe(select(selectAuthError));
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    if (this.loginForm.valid) {
      this.store.dispatch(
        login({
          username: this.loginForm.value.username,
          password: this.loginForm.value.password,
        })
      );
    }
  }
}
