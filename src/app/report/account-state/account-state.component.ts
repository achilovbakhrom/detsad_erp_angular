import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectAccountState,
  selectLoading,
} from '../../core/stores/account-state/account-state.selectors';
import { AccountState } from '../../model/AccountState';
import { Nillable } from '../../model/nullable';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { selectCompany } from '../../core/stores/common/common.selectors';
import { fetchAccountState } from '../../core/stores/account-state/account-state.actions';

@Component({
  selector: 'app-account-state',
  standalone: false,

  templateUrl: './account-state.component.html',
  styleUrl: './account-state.component.scss',
})
export class AccountStateComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<AccountState>>;
  isLoading$: Observable<boolean>;
  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectAccountState);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store
      .select(selectCompany)
      .pipe(distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe((company) => {
        if (company) {
          this.store.dispatch(fetchAccountState());
        }
      });
  }

  ngAfterViewInit(): void {
    this.resizeObserver = new ResizeObserver(() => {
      console.log('ttt', this.containerRef.nativeElement.offsetHeight);
      this.tableHeight = `${
        this.containerRef.nativeElement.offsetHeight - 190
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
