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
import { Position } from '../../../model/Position';
import { Company } from '../../../model/company';
import { PositionService } from '../../../position/position.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../core/stores/types';
import { selectCompany } from '../../../core/stores/common/common.selectors';

@Component({
  selector: 'app-position-picker',
  standalone: false,

  templateUrl: './position-picker.component.html',
  styleUrl: './position-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PositionPickerComponent),
      multi: true,
    },
  ],
})
export class PositionPickerComponent
  implements OnInit, OnChanges, ControlValueAccessor
{
  @Input() selectedPosition: Nillable<Position>;

  @Output() selectedPositionChange = new EventEmitter<Position | undefined>();

  options: Position[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private positionService: PositionService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedPosition'] &&
      changes['selectedPosition'].currentValue
    ) {
      const position = changes['selectedPosition'].currentValue;
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
          return this.positionService.fetchPositionList({
            page: 1,
            size: 50,
            search: value,
            company: company?.id,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((positioList) => {
        this.options = positioList;
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
      this.selectedPositionChange.emit(undefined);
    }
  }

  onPick(position: Position): void {
    this.inputValue = position.title ?? '';
    this.selectedPositionChange.emit(position);
    this._onChange(position);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedPositionChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = value.title;
      this.selectedPosition = value;
    } else {
      this.inputValue = '';
      this.selectedPosition = undefined;
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
