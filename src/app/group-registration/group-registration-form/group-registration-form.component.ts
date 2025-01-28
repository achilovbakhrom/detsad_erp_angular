import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import { saveGroupRegistration } from '../../core/stores/group-registration/group-registration.actions';

@Component({
  selector: 'app-group-registration-form',
  standalone: false,

  templateUrl: './group-registration-form.component.html',
  styleUrl: './group-registration-form.component.scss',
})
export class GroupRegistrationFormComponent {
  groupRegistrationForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.groupRegistrationForm = this.fb.group({
      date: ['', [Validators.required]],
      group: [null, [Validators.required]],
      branch: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.groupRegistrationForm.valid) {
      const groupRegistrationData = this.groupRegistrationForm.value;

      this.store.dispatch(
        saveGroupRegistration({
          groupRegistration: {
            date: groupRegistrationData.date,
            group: groupRegistrationData.group.id,
            branch: groupRegistrationData.branch.id,
            children: [],
          },
        })
      );
    }
  }
}
