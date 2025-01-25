import {
  Component,
  EventEmitter,
  forwardRef,
  Input,
  OnChanges,
  OnInit,
  Optional,
  Output,
  Self,
  SimpleChanges,
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  NgModel,
} from '@angular/forms';
import { Department } from '../../../model/Department';
import { Nillable } from '../../../model/nullable';
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
import { DepartmentService } from '../../../department/department.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/stores/types';
import { selectCompany } from '../../../core/stores/common/common.selectors';

@Component({
  selector: 'app-department-picker',
  standalone: false,

  templateUrl: './department-picker.component.html',
  styleUrl: './department-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DepartmentPickerComponent),
      multi: true,
    },
  ],
})
export class DepartmentPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() selectedDepartment: Nillable<Department>;

  @Output() selectedDepartmentChange = new EventEmitter<
    Department | undefined
  >();

  options: Department[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private departmentService: DepartmentService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedDepartment'] &&
      changes['selectedDepartment'].currentValue
    ) {
      const position = changes['selectedDepartment'].currentValue;
      this.inputValue = position.title;
    }
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => combineLatest([this.currentCompany, of(value)])),
        switchMap(([company, value]) => {
          return this.departmentService.fetchDepartmentList({
            page: 1,
            size: 50,
            search: value,
            company: company?.id,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((options) => {
        this.options = options;
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
      this.selectedDepartmentChange.emit(undefined);
    }
  }

  onPick(department: Department): void {
    this.inputValue = department.title ?? '';
    this.selectedDepartmentChange.emit(department);
    this._onChange(department);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedDepartmentChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = value.title;
      this.selectedDepartment = value;
    } else {
      this.inputValue = '';
      this.selectedDepartment = undefined;
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
