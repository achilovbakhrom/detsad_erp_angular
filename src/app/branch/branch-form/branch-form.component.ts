import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { saveBranch } from '../../core/stores/branch/branch.actions';

@Component({
  selector: 'app-branch-form',
  standalone: false,

  templateUrl: './branch-form.component.html',
  styleUrl: './branch-form.component.scss',
})
export class BranchFormComponent implements OnInit {
  branchForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.branchForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      address: [''],
      description: [''],
    });
  }

  onSubmit() {
    if (this.branchForm.valid) {
      const branchData = this.branchForm.value;
      this.store.dispatch(saveBranch({ branch: branchData }));
    }
  }
}
