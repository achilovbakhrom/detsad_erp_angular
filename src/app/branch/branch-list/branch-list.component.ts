import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Branch } from '../../model/Branch';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectBranchList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/branch/branch.selectors';
import {
  deleteBranchById,
  fetchBranchList,
  setPage,
  setSize,
} from '../../core/stores/branch/branch.actions';
import { selectCompany } from '../../core/stores/common/common.selectors';

@Component({
  selector: 'app-branch-list',
  standalone: false,

  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.scss',
})
export class BranchListComponent implements AfterViewInit, OnDestroy {
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<Branch[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectBranchList);
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
          this.store.dispatch(fetchBranchList());
        }
      });
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Branch) {
    if (arg.id) {
      this.store.dispatch(deleteBranchById({ id: arg.id }));
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
