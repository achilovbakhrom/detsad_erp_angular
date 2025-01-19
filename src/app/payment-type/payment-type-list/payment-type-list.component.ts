import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { PaymentType } from '../../model/PaymentType';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectLoading,
  selectPage,
  selectPaymentTypeList,
  selectSize,
} from '../../core/stores/payment-type/payment-type.selectors';
import {
  deletePaymentTypeById,
  fetchPaymentTypeList,
  setPage,
  setSize,
} from '../../core/stores/payment-type/payment-type.actions';

@Component({
  selector: 'app-payment-type-list',
  standalone: false,

  templateUrl: './payment-type-list.component.html',
  styleUrl: './payment-type-list.component.scss',
})
export class PaymentTypeListComponent {
  data$: Observable<Nillable<PaymentType[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectPaymentTypeList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchPaymentTypeList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: PaymentType) {
    if (arg.id) {
      this.store.dispatch(deletePaymentTypeById({ id: arg.id }));
    }
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      this.tableHeight = `${
        this.containerRef.nativeElement.offsetHeight - 170
      }px`;
    });

    this.resizeObserver.observe(this.containerRef.nativeElement);
  }

  ngOnDestroy(): void {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }
}
