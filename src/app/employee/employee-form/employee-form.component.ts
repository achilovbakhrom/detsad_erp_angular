import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { saveEmployee } from '../../core/stores/employee/employee.actions';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-employee-form',
  standalone: false,

  templateUrl: './employee-form.component.html',
  styleUrl: './employee-form.component.scss',
  providers: [DatePipe],
})
export class EmployeeFormComponent {
  employeeForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(100)]],
      last_name: ['', [Validators.required, Validators.maxLength(100)]],
      middle_name: [''],
      date_of_birth: [null, [Validators.required]],
      description: [''],
    });
  }

  onSubmit() {
    if (this.employeeForm.valid) {
      const employeeData = this.employeeForm.value;
      this.store.dispatch(
        saveEmployee({
          employee: {
            ...employeeData,
            date_of_birth: this.datePipe.transform(
              employeeData.date_of_birth,
              'yyyy-MM-dd'
            ),
          },
        })
      );
    }
  }
}
