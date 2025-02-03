import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { DatePipe } from '@angular/common';
import { saveSickLeave } from '../../core/stores/sick-leave/sick-leave.actions';

@Component({
  selector: 'app-sick-leave-form',
  standalone: false,

  templateUrl: './sick-leave-form.component.html',
  styleUrl: './sick-leave-form.component.scss',
  providers: [DatePipe],
})
export class SickLeaveFormComponent {
  sickLeaveForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.sickLeaveForm = this.fb.group({
      date: ['', [Validators.required]],
      child: [null, [Validators.required]],
      has_reason: [false, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.sickLeaveForm.valid) {
      const childContractData = this.sickLeaveForm.value;

      this.store.dispatch(
        saveSickLeave({
          sickLeave: {
            date:
              this.datePipe.transform(childContractData.date, 'yyyy-MM-dd') ??
              '',
            child: childContractData.child.id,
            has_reason: childContractData.has_reason,
            description: childContractData.description,
          },
        })
      );
    }
  }
}
