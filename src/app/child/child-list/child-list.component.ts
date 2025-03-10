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
import { Child } from '../../model/Child';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import {
  selectChildList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/child/child.selectors';
import {
  deleteChildById,
  fetchChildList,
  setPage,
  setSize,
} from '../../core/stores/child/child.actions';
import { selectCompany } from '../../core/stores/common/common.selectors';
import { fetchBranchList } from '../../core/stores/branch/branch.actions';

@Component({
  selector: 'app-child-list',
  standalone: false,

  templateUrl: './child-list.component.html',
  styleUrl: './child-list.component.scss',
})
export class ChildListComponent implements AfterViewInit, OnDestroy, OnInit {
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<Child[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectChildList);
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
          this.store.dispatch(fetchChildList());
        }
      });
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Child) {
    if (arg.id) {
      this.store.dispatch(deleteChildById({ id: arg.id }));
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
    this.destroy$.next()
    this.destroy$.complete();
  }
}
