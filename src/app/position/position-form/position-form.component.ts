import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import { savePosition } from '../../core/stores/position/position.actions';

@Component({
  selector: 'app-position-form',
  standalone: false,

  templateUrl: './position-form.component.html',
  styleUrl: './position-form.component.scss',
})
export class PositionFormComponent {
  positionForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.positionForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    if (this.positionForm.valid) {
      const positionData = this.positionForm.value;
      this.store.dispatch(savePosition({ position: positionData }));
    }
  }
}
