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
import { Child } from '../../../model/Child';
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
import { ChildService } from '../../../child/child.service';
import { NG_VALUE_ACCESSOR, NgModel } from '@angular/forms';
import { AppState } from '../../../core/stores/types';
import { Store } from '@ngrx/store';
import { selectCompany } from '../../../core/stores/common/common.selectors';

@Component({
  selector: 'app-child-picker',
  standalone: false,

  templateUrl: './child-picker.component.html',
  styleUrl: './child-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ChildPickerComponent),
      multi: true,
    },
  ],
})
export class ChildPickerComponent {
  @Input() selectedChild: Nillable<Child>;

  @Output() selectedChildChange = new EventEmitter<Child | undefined>();

  options: Child[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private childService: ChildService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedChild'] && changes['selectedChild'].currentValue) {
      const child = changes['selectedChild'].currentValue;
      this.inputValue = this.getChildName(child);
    }
  }

  protected getChildName(arg: Child): string {
    return [arg.first_name, arg.last_name, arg.middle_name]
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
          return this.childService.fetchChildList({
            page: 1,
            size: 50,
            search: value,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((childList) => {
        this.options = childList;
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
      this.selectedChildChange.emit(undefined);
    }
  }

  onPick(child: Child): void {
    this.inputValue = this.getChildName(child);
    this.selectedChildChange.emit(child);
    this._onChange(child);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedChildChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = this.getChildName(value);
      this.selectedChild = value;
    } else {
      this.inputValue = '';
      this.selectedChild = undefined;
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
