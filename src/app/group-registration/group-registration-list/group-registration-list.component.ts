import { Component, ElementRef, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Nillable } from '../../model/nullable';
import { GroupRegistration } from '../../model/GroupRegistration';
import { Store } from '@ngrx/store';
import { AppState } from '../../core/stores/types';
import {
  selectGroupRegistrationList,
  selectLoading,
  selectPage,
  selectSize,
} from '../../core/stores/group-registration/group-registration.selectors';
import {
  deleteGroupRegistrationById,
  fetchGroupRegistrationList,
  setPage,
  setSize,
} from '../../core/stores/group-registration/group-registration.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-group-registration-list',
  standalone: false,

  templateUrl: './group-registration-list.component.html',
  styleUrl: './group-registration-list.component.scss',
})
export class GroupRegistrationListComponent {
  data$: Observable<Nillable<GroupRegistration[]>>;
  page$: Observable<Nillable<number>>;
  size$: Observable<Nillable<number>>;
  isLoading$: Observable<boolean>;

  tableHeight = '0';

  @ViewChild('containerEl')
  containerRef!: ElementRef;

  private resizeObserver!: ResizeObserver;

  constructor(private store: Store<AppState>, private router: Router) {
    this.data$ = this.store.select(selectGroupRegistrationList);
    this.page$ = this.store.select(selectPage);
    this.size$ = this.store.select(selectSize);
    this.isLoading$ = this.store.select(selectLoading);
  }

  ngOnInit(): void {
    this.store.dispatch(fetchGroupRegistrationList());
  }

  setPage(arg: number) {
    this.store.dispatch(setPage({ page: arg }));
  }

  setSize(arg: number) {
    this.store.dispatch(setSize({ size: arg }));
  }

  onDelete(arg: GroupRegistration) {
    if (arg.id) {
      this.store.dispatch(deleteGroupRegistrationById({ id: arg.id }));
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

  onEdit(arg: GroupRegistration) {
    this.router.navigate([`/app/group-registration/${arg.id}/edit`]);
  }
}
