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
import { Employee } from '../../model/Employee';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectEmployeeList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/employee/employee.selectors';
import {
  deleteEmployeeById,
  fetchEmployeeList,
  setPage,
  setSize,
} from '../../core/stores/employee/employee.actions';
import { selectCompany } from '../../core/stores/common/common.selectors';

@Component({
  selector: 'app-employee-list',
  standalone: false,

  templateUrl: './employee-list.component.html',
  styleUrl: './employee-list.component.scss',
})
export class EmployeeListComponent implements AfterViewInit, OnDestroy, OnInit {
  private destroy$ = new Subject<void>();
  data$: Observable<Nillable<Employee[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectEmployeeList);
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
          this.store.dispatch(fetchEmployeeList());
        }
      });
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Employee) {
    if (arg.id) {
      this.store.dispatch(deleteEmployeeById({ id: arg.id }));
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
