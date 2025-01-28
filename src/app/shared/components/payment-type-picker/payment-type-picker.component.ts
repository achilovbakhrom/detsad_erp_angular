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
import { PaymentType } from '../../../model/PaymentType';
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
import { PaymentTypeService } from '../../../payment-type/payment-type.service';
import { AppState } from '../../../core/stores/types';
import { Store } from '@ngrx/store';
import { selectCompany } from '../../../core/stores/common/common.selectors';

@Component({
  selector: 'app-payment-type-picker',
  standalone: false,

  templateUrl: './payment-type-picker.component.html',
  styleUrl: './payment-type-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PaymentTypePickerComponent),
      multi: true,
    },
  ],
})
export class PaymentTypePickerComponent {
  @Input() selectedPaymentType: Nillable<PaymentType>;

  @Output() selectedPaymentTypeChange = new EventEmitter<
    PaymentType | undefined
  >();

  options: PaymentType[] = [];
  loading = false;
  inputValue: string = '';
  private searchSubject = new Subject<string>();
  private currentCompany: Observable<Nillable<Company>>;

  private _onChange: (value: any) => void = () => {};
  private _onTouched: () => void = () => {};

  constructor(
    private paymentTypeService: PaymentTypeService,
    @Optional() @Self() public ngModel: NgModel,
    private store: Store<AppState>
  ) {
    this.currentCompany = this.store.select(selectCompany);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes['selectedPaymentType'] &&
      changes['selectedPaymentType'].currentValue
    ) {
      const paymentType = changes['selectedPaymentType'].currentValue;
      this.inputValue = this.getPaymentTypeName(paymentType);
    }
  }

  protected getPaymentTypeName(arg: PaymentType): string {
    return arg.name ?? '';
  }

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        switchMap((value) => combineLatest([this.currentCompany, of(value)])),
        switchMap(([company, value]) => {
          return this.paymentTypeService.fetchPaymentTypeList({
            page: 1,
            size: 50,
            search: value,
            company: company?.id,
          });
        }),
        map((response) => response.results)
      )
      .subscribe((paymentTypeList) => {
        this.options = paymentTypeList;
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
      this.selectedPaymentTypeChange.emit(undefined);
    }
  }

  onPick(paymentType: PaymentType): void {
    this.inputValue = this.getPaymentTypeName(paymentType);
    this.selectedPaymentTypeChange.emit(paymentType);
    this._onChange(paymentType);
  }

  clearSelection(): void {
    this.inputValue = '';
    this.selectedPaymentTypeChange.emit(undefined);
    this._onChange(undefined);
    this.searchSubject.next('');
  }

  // ControlValueAccessor methods
  writeValue(value: any): void {
    if (value) {
      this.inputValue = this.getPaymentTypeName(value);
      this.selectedPaymentType = value;
    } else {
      this.inputValue = '';
      this.selectedPaymentType = undefined;
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
