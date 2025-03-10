import { Component, ElementRef, ViewChild } from '@angular/core';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { Account } from '../../model/Account';
import { Nillable } from '../../model/nullable';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectAccountList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/account/account.selectors';
import { selectCompany } from '../../core/stores/common/common.selectors';
import {
  deleteAccountById,
  fetchAccountList,
  setPage,
  setSize,
} from '../../core/stores/account/account.actions';

@Component({
  selector: 'app-account-list',
  standalone: false,

  templateUrl: './account-list.component.html',
  styleUrl: './account-list.component.scss',
})
export class AccountListComponent {
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<Account[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectAccountList);
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
          this.store.dispatch(fetchAccountList());
        }
      });
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Account) {
    if (arg.id) {
      this.store.dispatch(deleteAccountById({ id: arg.id }));
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
