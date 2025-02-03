import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Salary } from '../../model/Salary';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import { Router } from '@angular/router';
import {
  selectLoading,
  selectPage,
  selectSalaryList,
  selectSize,
} from '../../core/stores/salary/salary.selectors';
import {
  deleteSalaryById,
  fetchSalaryList,
  setPage,
  setSize,
} from '../../core/stores/salary/salary.actions';

@Component({
  selector: 'app-salary-list',
  standalone: false,

  templateUrl: './salary-list.component.html',
  styleUrl: './salary-list.component.scss',
})
export class SalaryListComponent {
  data$: Observable<Nillable<Salary[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>, private router: Router) {
    this.data$ = this.store.select(selectSalaryList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchSalaryList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Salary) {
    if (arg.id) {
      this.store.dispatch(deleteSalaryById({ id: arg.id }));
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
