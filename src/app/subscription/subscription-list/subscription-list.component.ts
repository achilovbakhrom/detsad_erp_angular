import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Subscription } from '../../model/Subscription';
import {
  selectLoading,
  selectPage,
  selectSize,
  selectSubscriptionList,
} from '../../core/stores/subscription/subscription.selectors';
import {
  deleteSubscriptionById,
  fetchSubscriptionList,
  setPage,
  setSize,
} from '../../core/stores/subscription/subscription.actions';
import { selectCompany } from '../../core/stores/common/common.selectors';

@Component({
  selector: 'app-subscription-list',
  standalone: false,

  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.scss',
})
export class SubscriptionListComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<Subscription[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectSubscriptionList);
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
          this.store.dispatch(fetchSubscriptionList());
        }
      });
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Subscription) {
    if (arg.id) {
      this.store.dispatch(deleteSubscriptionById({ id: arg.id }));
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
