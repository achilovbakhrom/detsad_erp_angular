import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import { EmployeeService } from '../../../employee/employee.service';
import { ControlValueAccessor, NgModel } from '@angular/forms';
import { Nillable } from '../../../model/nullable';
import { Employee } from '../../../model/Employee';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Subject,
  switchMap,
} from 'rxjs';

@Component({
  selector: 'app-employee-picker',
  standalone: false,

  templateUrl: './employee-picker.component.html',
  styleUrl: './employee-picker.component.scss',
})
export class EmployeePickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() selectedEmployee: Nillable<Employee>;

  @Output() selectedEmployeeChange = new EventEmitter<Employee | undefined>();

  options: Employee[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private employeeService: EmployeeService,
    @Optional() @Self() public ngModel: NgModel
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedEmployee'] &&
      changes['selectedEmployee'].currentValue
    ) {
      const employee = changes['selectedEmployee'].currentValue;
      this.inputValue = this.getEmployeeName(employee);
    }
  }

  private getEmployeeName(arg: Employee): string {
    return [arg.first_name, arg.last_name, arg.middle_name]
      .filter((item) => item != null)
      .join(' ');
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => {
          return this.employeeService.fetchEmployeeList({
            page: 1,
            size: 50,
            search: value,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((employeeList) => {
        this.options = employeeList;
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
      this.selectedEmployeeChange.emit(undefined);
    }
  }

  onPick(employee: Employee): void {
    this.inputValue = this.getEmployeeName(employee);
    this.selectedEmployeeChange.emit(employee);
    this._onChange(employee);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedEmployeeChange.emit(undefined);
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
