import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
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

@Component({
  selector: 'app-branch-list',
  standalone: false,

  templateUrl: './branch-list.component.html',
  styleUrl: './branch-list.component.scss',
})
export class BranchListComponent implements AfterViewInit, OnDestroy, OnInit {
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
    this.store.dispatch(fetchBranchList());
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
  }
}
