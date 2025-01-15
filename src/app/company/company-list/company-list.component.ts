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
import { Company } from '../../model/company';
import { Observable } from 'rxjs';
import {
  selectCompanyList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/company/company.selectors';
import { Nillable } from '../../model/nullable';
import {
  deleteCompanyById,
  fetchCompanyList,
  setPage,
  setSize,
} from '../../core/stores/company/company.actions';

@Component({
  selector: 'app-company-list',
  standalone: false,
  templateUrl: './company-list.component.html',
  styleUrl: './company-list.component.scss',
})
export class CompanyListComponent implements AfterViewInit, OnDestroy, OnInit {
  data$: Observable<Nillable<Company[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectCompanyList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchCompanyList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Company) {
    if (arg.id) {
      this.store.dispatch(deleteCompanyById({ id: arg.id }));
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
