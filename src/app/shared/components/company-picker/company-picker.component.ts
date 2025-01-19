import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  Optional,
  Self,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Company } from '../../../model/company';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  switchMap,
} from 'rxjs';
import { CompanyService } from '../../../company/company.service';
import {
  NgModel,
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { Nillable } from '../../../model/nullable';

@Component({
  selector: 'app-company-picker',
  standalone: false,
  templateUrl: './company-picker.component.html',
  styleUrl: './company-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: CompanyPickerComponent,
      multi: true,
    },
  ],
})
export class CompanyPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() selectedCompany: Nillable<Company>;

  @Output() selectedCompanyChange = new EventEmitter<Company | undefined>();

  options: Company[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private companyService: CompanyService,
    @Optional() @Self() public ngModel: NgModel
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedCompany'] && changes['selectedCompany'].currentValue) {
      const company = changes['selectedCompany'].currentValue;
      this.inputValue = company.name || '';
    }
  }

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
      });

    if (this.ngModel) {
      this.ngModel.valueChanges?.subscribe((value) => {
        this.inputValue = value?.name || '';
        this._onChange(value);
      });
    }

    this.searchSubject.next('');
  }

  onChange(value: string): void {
    this.searchSubject.next(value);

    if (this.inputValue !== value) {
      this.selectedCompanyChange.emit(undefined);
    }
  }

  onPick(company: Company): void {
    this.inputValue = company.name;
    this.selectedCompanyChange.emit(company);
    this._onChange(company);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedCompanyChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = value.name || '';
      this.selectedCompany = value;
    } else {
      this.inputValue = '';
      this.selectedCompany = undefined;
    }
  }

  registerOnChange(fn: (value: any) => void): void {
    this._onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }

  // Add this method to handle the blur event and mark the control as touched
  onBlur(): void {
    this._onTouched();
  }
}
