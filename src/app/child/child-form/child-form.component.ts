import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { saveChild } from '../../core/stores/child/child.actions';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-child-form',
  standalone: false,

  templateUrl: './child-form.component.html',
  styleUrl: './child-form.component.scss',
  providers: [DatePipe],
})
export class ChildFormComponent {
  childForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.childForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.maxLength(100)]],
      middle_name: [''],
      date_of_birth: [null, [Validators.required]],
      description: [''],
    });
  }

  onSubmit() {
    if (this.childForm.valid) {
      const childData = this.childForm.value;
      this.store.dispatch(
        saveChild({
          child: {
            ...childData,
            date_of_birth: this.datePipe.transform(
              childData.date_of_birth,
              'yyyy-MM-dd'
            ),
          },
        })
      );
    }
  }
}
