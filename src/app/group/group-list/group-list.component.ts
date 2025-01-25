import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { Group } from '../../model/Group';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectGroupList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/group/group.selectors';
import {
  deleteGroupById,
  fetchGroupList,
  setPage,
  setSize,
} from '../../core/stores/group/group.actions';

@Component({
  selector: 'app-group-list',
  standalone: false,

  templateUrl: './group-list.component.html',
  styleUrl: './group-list.component.scss',
})
export class GroupListComponent implements OnDestroy, OnInit {
  data$: Observable<Nillable<Group[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>) {
    this.data$ = this.store.select(selectGroupList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchGroupList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: Group) {
    if (arg.id) {
      this.store.dispatch(deleteGroupById({ id: arg.id }));
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
