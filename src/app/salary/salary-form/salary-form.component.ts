import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nillable } from '../../model/nullable';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { ActivatedRoute } from '@angular/router';
import { Salary } from '../../model/Salary';
import { saveSalary } from '../../core/stores/salary/salary.actions';

@Component({
  selector: 'app-salary-form',
  standalone: false,

  templateUrl: './salary-form.component.html',
  styleUrl: './salary-form.component.scss',
})
export class SalaryFormComponent {
  salaryForm!: FormGroup;
  id?: Nillable<string>;
  subscriptions: Subscription[] = [];
  showAdd = false;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.paramMap.get('id');

    this.salaryForm = this.fb.group({
      date: ['', [Validators.required]],
      employee: [null, [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  isEditMode() {
    return this.id != null;
  }

  onAdd() {
    this.showAdd = true;
  }

  onClose() {
    this.showAdd = false;
  }

  onSelect(arg: Salary) {
    this.salaryForm.patchValue({
      children: [...this.salaryForm.value.children, arg],
    });
    this.onClose();
  }

  onDeleteChild(arg: Salary) {
    this.salaryForm.patchValue({
      children: this.salaryForm.value.children.filter(
        (item: Salary) => item.id !== arg.id
      ),
    });
  }

  getChildContractName(arg: Salary) {
    return [
      arg.employee.employee.last_name,
      arg.employee.employee.first_name,
      arg.employee.employee.middle_name,
    ]
      .filter(Boolean)
      .join(' ');
  }

  onSubmit() {
    if (this.salaryForm.valid) {
      const salaryData = this.salaryForm.value;

      this.store.dispatch(
        saveSalary({
          salary: {
            date: salaryData.date,
            employee: salaryData.employee.id,
            description: salaryData.description,
          },
        })
      );
    }
  }
}
