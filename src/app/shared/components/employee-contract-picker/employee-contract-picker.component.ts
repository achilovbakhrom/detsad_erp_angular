import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  Optional,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { Nillable } from '../../../model/nullable';
import { EmployeeContract } from '../../../model/EmployeeContract';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { Company } from '../../../model/company';
import { EmployeeContractService } from '../../../employee-contract/employee-contract.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/stores/types';
import { selectCompany } from '../../../core/stores/common/common.selectors';

@Component({
  selector: 'app-employee-contract-picker',
  standalone: false,

  templateUrl: './employee-contract-picker.component.html',
  styleUrl: './employee-contract-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => EmployeeContractPickerComponent),
      multi: true,
    },
  ],
})
export class EmployeeContractPickerComponent {
  @Input() selectedEmployee: Nillable<EmployeeContract>;

  @Output() selectedEmployeeContractChange = new EventEmitter<
    EmployeeContract | undefined
  >();

  options: EmployeeContract[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private employeeContractService: EmployeeContractService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedEmployee'] &&
      changes['selectedEmployee'].currentValue
    ) {
      const value = changes['selectedEmployee'].currentValue;
      this.inputValue = this.getEmployeeName(value);
    }
  }

  protected getEmployeeName(arg: EmployeeContract): string {
    return [
      arg.employee.first_name,
      arg.employee.last_name,
      arg.employee.middle_name,
    ]
      .filter((item) => item != null)
      .join(' ');
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => combineLatest([this.currentCompany, of(value)])),
        switchMap(([company, value]) => {
          return this.employeeContractService.fetchEmployeeContractList({
            page: 1,
            size: 50,
            search: value,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((employeeContractList) => {
        this.options = employeeContractList;
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
      this.selectedEmployeeContractChange.emit(undefined);
    }
  }

  onPick(arg: EmployeeContract): void {
    this.inputValue = this.getEmployeeName(arg);
    this.selectedEmployeeContractChange.emit(arg);
    this._onChange(arg);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedEmployeeContractChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = this.getEmployeeName(value);
      this.selectedEmployee = value;
    } else {
      this.inputValue = '';
      this.selectedEmployee = undefined;
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
