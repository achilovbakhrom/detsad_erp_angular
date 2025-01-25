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
import { Branch } from '../../../model/Branch';
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
import { BranchService } from '../../../branch/branch.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/stores/types';
import { selectCompany } from '../../../core/stores/common/common.selectors';

@Component({
  selector: 'app-branch-picker',
  standalone: false,

  templateUrl: './branch-picker.component.html',
  styleUrl: './branch-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => BranchPickerComponent),
      multi: true,
    },
  ],
})
export class BranchPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() selectedBranch: Nillable<Branch>;

  @Output() selectedDepartmentChange = new EventEmitter<Branch | undefined>();

  options: Branch[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private branchService: BranchService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedBranch'] && changes['selectedBranch'].currentValue) {
      const branch = changes['selectedBranch'].currentValue;
      this.inputValue = branch.name;
    }
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => combineLatest([this.currentCompany, of(value)])),
        switchMap(([company, value]) => {
          return this.branchService.fetchBranchList({
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

  onPick(branch: Branch): void {
    this.inputValue = branch.name ?? '';
    this.selectedDepartmentChange.emit(branch);
    this._onChange(branch);
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
      this.inputValue = value.name;
      this.selectedBranch = value;
    } else {
      this.inputValue = '';
      this.selectedBranch = undefined;
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
