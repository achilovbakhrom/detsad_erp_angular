import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Reason } from '../../model/Reason';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import {
  selectLoading,
  selectPage,
  selectReasonList,
  selectSize,
} from '../../core/stores/reason/reason.selectors';
import {
  deleteReasonById,
  fetchReasonList,
  setPage,
  setSize,
} from '../../core/stores/reason/reason.actions';

@Component({
  selector: 'app-reason-list',
  standalone: false,

  templateUrl: './reason-list.component.html',
  styleUrl: './reason-list.component.scss',
})
export class ReasonListComponent {
  data$: Observable<Nillable<Reason[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectReasonList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchReasonList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Reason) {
    if (arg.id) {
      this.store.dispatch(deleteReasonById({ id: arg.id }));
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
