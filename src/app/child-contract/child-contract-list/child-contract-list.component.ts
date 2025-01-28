import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { ChildContract } from '../../model/ChildContract';
import { AppState } from '../../core/stores/types';
import { Store } from '@ngrx/store';
import {
  selectChildContractList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/child-contract/child-contract.selectors';
import {
  deleteChildContractById,
  fetchChildContractList,
  setPage,
  setSize,
} from '../../core/stores/child-contract/child-contract.actions';

@Component({
  selector: 'app-child-contract-list',
  standalone: false,

  templateUrl: './child-contract-list.component.html',
  styleUrl: './child-contract-list.component.scss',
})
export class ChildContractListComponent {
  data$: Observable<Nillable<ChildContract[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectChildContractList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchChildContractList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: ChildContract) {
    if (arg.id) {
      this.store.dispatch(deleteChildContractById({ id: arg.id }));
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
