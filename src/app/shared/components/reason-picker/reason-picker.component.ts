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
import { Reason } from '../../../model/Reason';
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
import { ReasonService } from '../../../reason/reason.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/stores/types';
import { selectCompany } from '../../../core/stores/common/common.selectors';

@Component({
  selector: 'app-reason-picker',
  standalone: false,

  templateUrl: './reason-picker.component.html',
  styleUrl: './reason-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ReasonPickerComponent),
      multi: true,
    },
  ],
})
export class ReasonPickerComponent {
  @Input() selectedReason: Nillable<Reason>;

  @Output() selectedReasonChange = new EventEmitter<Reason | undefined>();

  options: Reason[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private reasonService: ReasonService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedReason'] && changes['selectedReason'].currentValue) {
      const reason = changes['selectedReason'].currentValue;
      this.inputValue = this.getReasonName(reason);
    }
  }

  protected getReasonName(arg: Reason): string {
    return arg.title ?? '';
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => combineLatest([this.currentCompany, of(value)])),
        switchMap(([company, value]) => {
          return this.reasonService.fetchReasonList({
            page: 1,
            size: 50,
            search: value,
            company: company?.id,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((reasonList) => {
        this.options = reasonList;
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
      this.selectedReasonChange.emit(undefined);
    }
  }

  onPick(arg: Reason): void {
    this.inputValue = this.getReasonName(arg);
    this.selectedReasonChange.emit(arg);
    this._onChange(arg);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedReasonChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = this.getReasonName(value);
      this.selectedReason = value;
    } else {
      this.inputValue = '';
      this.selectedReason = undefined;
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
