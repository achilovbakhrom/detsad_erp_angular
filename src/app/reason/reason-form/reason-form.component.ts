import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import { saveReason } from '../../core/stores/reason/reason.actions';

@Component({
  selector: 'app-reason-form',
  standalone: false,

  templateUrl: './reason-form.component.html',
  styleUrl: './reason-form.component.scss',
})
export class ReasonFormComponent {
  reasonForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.reasonForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    if (this.reasonForm.valid) {
      const reasonData = this.reasonForm.value;
      this.store.dispatch(saveReason({ reason: reasonData }));
    }
  }
}
