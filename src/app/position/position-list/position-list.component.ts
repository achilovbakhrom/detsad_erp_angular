import { Component, ElementRef, ViewChild } from '@angular/core';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Position } from '../../model/Position';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectPage,
  selectPositionList,
  selectSize,
} from '../../core/stores/position/position.selectors';
import {
  deletePositionById,
  fetchPositionList,
  setPage,
  setSize,
} from '../../core/stores/position/position.actions';
import { selectCompany } from '../../core/stores/common/common.selectors';

@Component({
  selector: 'app-position-list',
  standalone: false,

  templateUrl: './position-list.component.html',
  styleUrl: './position-list.component.scss',
})
export class PositionListComponent {
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<Position[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectPositionList);
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
          this.store.dispatch(fetchPositionList());
        }
      });
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Position) {
    if (arg.id) {
      this.store.dispatch(deletePositionById({ id: arg.id }));
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
