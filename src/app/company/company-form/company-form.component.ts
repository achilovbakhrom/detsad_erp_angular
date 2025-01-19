import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { saveCompany } from '../../core/stores/company/company.actions';

@Component({
  selector: 'app-company-form',
  standalone: false,

  templateUrl: './company-form.component.html',
  styleUrl: './company-form.component.scss',
})
export class CompanyFormComponent implements OnInit {
  companyForm!: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<AppState>) {}

  ngOnInit(): void {
    this.companyForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
      is_default: [false, [Validators.required]],
      inn: ['', [Validators.required, Validators.pattern(/^\d{9}$/)]], // Example validation for 9-digit INN
      mfo: ['', [Validators.pattern(/^\d{5}$/)]], // Optional 5-digit MFO
      jurisdical_address: ['', [Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(500)]],
    });
  }

  onSubmit() {
    if (this.companyForm.valid) {
      const companyData = this.companyForm.value;
      this.store.dispatch(saveCompany({ company: companyData }));
    }
  }
}
