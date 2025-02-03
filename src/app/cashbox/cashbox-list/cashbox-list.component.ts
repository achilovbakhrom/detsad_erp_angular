import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Cashbox } from '../../model/Cashbox';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import {
  selectCashboxList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/cashbox/cashbox.selectors';
import {
  deleteCashboxById,
  fetchCashboxList,
  setPage,
  setSize,
} from '../../core/stores/cashbox/cashbox.actions';

@Component({
  selector: 'app-cashbox-list',
  standalone: false,

  templateUrl: './cashbox-list.component.html',
  styleUrl: './cashbox-list.component.scss',
})
export class CashboxListComponent {
  data$: Observable<Nillable<Cashbox[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectCashboxList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCashboxList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Cashbox) {
    if (arg.id) {
      this.store.dispatch(deleteCashboxById({ id: arg.id }));
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
