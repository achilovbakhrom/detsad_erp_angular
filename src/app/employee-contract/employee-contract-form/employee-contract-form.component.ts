import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { saveEmployeeContract } from '../../core/stores/employee-contract/employee-contract.actions';

@Component({
  selector: 'app-employee-contract-form',
  standalone: false,

  templateUrl: './employee-contract-form.component.html',
  styleUrl: './employee-contract-form.component.scss',
})
export class EmployeeContractFormComponent implements OnInit {
  employeeContractForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.employeeContractForm = this.fb.group({
      date: ['', [Validators.required]],
      employee: [null, [Validators.required]],
      position: [null, [Validators.required]],
      department: [null, [Validators.required]],
      salary: [0, [Validators.required]],
      branch: [null, [Validators.required]],
    });
  }

  onSubmit() {
    if (this.employeeContractForm.valid) {
      const employeeContractData = this.employeeContractForm.value;

      this.store.dispatch(
        saveEmployeeContract({
          employeeContract: {
            date: employeeContractData.date,
            employee: employeeContractData.employee.id,
            position: employeeContractData.position.id,
            department: employeeContractData.department.id,
            salary: employeeContractData.salary,
            branch: employeeContractData.branch.id,
          },
        })
      );
    }
  }
}
