import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Transaction } from '../../model/Transaction';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import {
  selectTransactionList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/transaction/transaction.selectors';
import {
  deleteTransactionById,
  fetchTransactionList,
  setPage,
  setSize,
} from '../../core/stores/transaction/transaction.actions';
import { selectCompany } from '../../core/stores/common/common.selectors';

@Component({
  selector: 'app-transaction-list',
  standalone: false,

  templateUrl: './transaction-list.component.html',
  styleUrl: './transaction-list.component.scss',
})
export class TransactionListComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<Transaction[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectTransactionList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store
      .select(selectCompany)
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((company) => {
        if (company) {
          this.store.dispatch(fetchTransactionList());
        }
      });
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Transaction) {
    if (arg.id) {
      this.store.dispatch(deleteTransactionById({ id: arg.id }));
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
    this.destroy$.next();
    this.destroy$.complete();
  }
}
