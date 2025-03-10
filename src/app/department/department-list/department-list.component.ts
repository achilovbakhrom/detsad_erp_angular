import { Component, ElementRef, ViewChild } from '@angular/core';
import { distinctUntilChanged, Observable, Subject, takeUntil } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Department } from '../../model/Department';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectDepartmentList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/department/department.selectors';
import {
  deleteDepartmentById,
  fetchDepartmentList,
  setPage,
  setSize,
} from '../../core/stores/department/department.actions';
import { selectCompany } from '../../core/stores/common/common.selectors';

@Component({
  selector: 'app-department-list',
  standalone: false,

  templateUrl: './department-list.component.html',
  styleUrl: './department-list.component.scss',
})
export class DepartmentListComponent {
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<Department[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectDepartmentList);
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
          this.store.dispatch(fetchDepartmentList());
        }
      });
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Department) {
    if (arg.id) {
      this.store.dispatch(deleteDepartmentById({ id: arg.id }));
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
