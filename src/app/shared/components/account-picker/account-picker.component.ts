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
import { Account } from '../../../model/Account';
import { Store } from '@ngrx/store';
import {
  Subject,
  Observable,
  debounceTime,
  distinctUntilChanged,
  switchMap,
  combineLatest,
  of,
  map,
} from 'rxjs';
import { selectCompany } from '../../../core/stores/common/common.selectors';
import { AppState } from '../../../core/stores/types';
import { Company } from '../../../model/company';
import { Nillable } from '../../../model/nullable';
import { AccountService } from '../../../account/account.service';

@Component({
  selector: 'app-account-picker',
  standalone: false,

  templateUrl: './account-picker.component.html',
  styleUrl: './account-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccountPickerComponent),
      multi: true,
    },
  ],
})
export class AccountPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() selectedAccount: Nillable<Account>;

  @Output() selectedAccountChange = new EventEmitter<Account | undefined>();

  options: Account[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private accountService: AccountService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedAccount'] && changes['selectedAccount'].currentValue) {
      const account = changes['selectedAccount'].currentValue;
      this.inputValue = account.name;
    }
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => combineLatest([this.currentCompany, of(value)])),
        switchMap(([company, value]) => {
          return this.accountService.fetchAccountList({
            page: 1,
            size: 50,
            search: value,
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
      this.selectedAccountChange.emit(undefined);
    }
  }

  onPick(account: Account): void {
    this.inputValue = account.name ?? '';
    this.selectedAccountChange.emit(account);
    this._onChange(account);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedAccountChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = value.title;
      this.selectedAccount = value;
    } else {
      this.inputValue = '';
      this.selectedAccount = undefined;
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
