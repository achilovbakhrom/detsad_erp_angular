import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import { saveDepartment } from '../../core/stores/department/department.actions';

@Component({
  selector: 'app-department-form',
  standalone: false,

  templateUrl: './department-form.component.html',
  styleUrl: './department-form.component.scss',
})
export class DepartmentFormComponent implements OnInit {
  departmentForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.departmentForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }

  onSubmit() {
    if (this.departmentForm.valid) {
      const departmentData = this.departmentForm.value;
      this.store.dispatch(saveDepartment({ department: departmentData }));
    }
  }
}
