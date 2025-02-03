import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectLoading,
  selectPage,
  selectSickLeaveList,
  selectSize,
} from '../../core/stores/sick-leave/sick-leave.selectors';
import { SickLeave } from '../../model/SickLeave';
import {
  deleteSickLeaveById,
  fetchSickLeaveList,
  setPage,
  setSize,
} from '../../core/stores/sick-leave/sick-leave.actions';

@Component({
  selector: 'app-sick-leave-list',
  standalone: false,

  templateUrl: './sick-leave-list.component.html',
  styleUrl: './sick-leave-list.component.scss',
})
export class SickLeaveListComponent {
  data$: Observable<Nillable<SickLeave[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectSickLeaveList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchSickLeaveList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: SickLeave) {
    if (arg.id) {
      this.store.dispatch(deleteSickLeaveById({ id: arg.id }));
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
