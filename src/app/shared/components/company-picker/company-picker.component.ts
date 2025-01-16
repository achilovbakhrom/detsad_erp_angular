import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Company } from '../../../model/company';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { CompanyService } from '../../../company/company.service';

@Component({
  selector: 'app-company-picker',
  standalone: false,

  templateUrl: './company-picker.component.html',
  styleUrl: './company-picker.component.scss',
})
export class CompanyPickerComponent implements OnInit {
  @Input()
  set selectedCompany(value: Company | undefined) {
    this.inputValue = value?.name || '';
  }

  @Output()
  selectedCompanyChange = new EventEmitter<Company | undefined>();

  options: Company[] = [];
  loading = false;
  inputValue?: string;
  private searchSubject = new Subject<string>();

  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => {
          return this.companyService.fetchCompanyList({
            page: 1,
            size: 50,
            search: value,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((companyList) => {
        this.options = companyList;
        console.log(this.options);
      });
    this.searchSubject.next('');
  }

  onChange(value: string): void {
    this.searchSubject.next(value);

    if (this.inputValue !== value) {
      this.selectedCompanyChange.emit(undefined);
    }
  }

  onPick(company: Company) {
    this.inputValue = company.name;
    this.selectedCompanyChange.emit(company);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedCompanyChange.emit(undefined);
  }
}
