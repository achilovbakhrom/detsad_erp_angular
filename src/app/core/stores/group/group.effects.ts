import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  deleteGroupById,
  fetchGroupList,
  fetchGroupListError,
  fetchGroupListSuccess,
  saveGroup,
  saveGroupFailure,
  saveGroupSuccess,
  setPage,
  setSize,
} from './group.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './group.selectors';
import { selectCompany } from '../common/common.selectors';
import { GroupService } from '../../../group/group.service';

@Injectable()
export class GroupEffects {
  constructor(
    private actions$: Actions,
    private groupService: GroupService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveGroup$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveGroup),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.groupService
          .createGroup({ ...action.group, company: company?.id })
          .pipe(
            map((group) => {
              this.showSuccessMessage();
              this.goToGroupListPage();
              return saveGroupSuccess({ group });
            }),

            catchError((error) =>
              of(saveGroupFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchGroupList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchGroupList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.groupService
          .fetchGroupList({ page, size, company: company?.id })
          .pipe(
            map((response) => fetchGroupListSuccess(response)),
            catchError((error) =>
              of(fetchGroupListError({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  triggerLoadList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(setPage, setSize),
      map(() => fetchGroupList())
    )
  );

  deleteGroupById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteGroupById),
      mergeMap((action) =>
        this.groupService.deleteGroupById(action.id).pipe(
          map(() => fetchGroupList()),
          catchError((error) =>
            of().pipe(tap(() => this.showErrorMessage(error)))
          )
        )
      )
    )
  );

  showErrorMessage(msg: string) {
    this.notificationService.error('Ошибка', msg);
  }

  showSuccessMessage() {
    this.notificationService.success('Успешно', 'Группа создана успешно');
  }

  goToGroupListPage() {
    this.router.navigate(['/app/group']);
  }
}
