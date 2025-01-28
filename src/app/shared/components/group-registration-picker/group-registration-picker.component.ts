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
import { GroupRegistration } from '../../../model/GroupRegistration';
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
import { GroupRegistrationService } from '../../../group-registration/group-registration.service';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { AppState } from '../../../core/stores/types';
import { Store } from '@ngrx/store';
import { selectCompany } from '../../../core/stores/common/common.selectors';

@Component({
  selector: 'app-group-registration-picker',
  standalone: false,

  templateUrl: './group-registration-picker.component.html',
  styleUrl: './group-registration-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GroupRegistrationPickerComponent),
      multi: true,
    },
  ],
})
export class GroupRegistrationPickerComponent {
  @Input() selectedGroupRegistration: Nillable<GroupRegistration>;

  @Output() selectedGroupRegistrationChange = new EventEmitter<
    GroupRegistration | undefined
  >();

  options: GroupRegistration[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private groupRegistrationService: GroupRegistrationService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedGroupRegistration'] &&
      changes['selectedGroupRegistration'].currentValue
    ) {
      const branch = changes['selectedGroupRegistration'].currentValue;
      this.inputValue = branch?.group?.name;
    }
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => combineLatest([this.currentCompany, of(value)])),
        switchMap(([company, value]) => {
          return this.groupRegistrationService.fetchGroupRegistrationList({
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
      this.selectedGroupRegistrationChange.emit(undefined);
    }
  }

  onPick(groupRegistration: GroupRegistration): void {
    this.inputValue = groupRegistration?.group?.name ?? '';
    this.selectedGroupRegistrationChange.emit(groupRegistration);
    this._onChange(groupRegistration);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedGroupRegistrationChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = value.name;
      this.selectedGroupRegistration = value;
    } else {
      this.inputValue = '';
      this.selectedGroupRegistration = undefined;
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
