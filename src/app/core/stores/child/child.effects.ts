import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  debounceTime,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  deleteChildById,
  fetchChildList,
  fetchChildListError,
  fetchChildListSuccess,
  saveChild,
  saveChildFailure,
  saveChildSuccess,
  setPage,
  setSize,
} from './child.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './child.selectors';
import { selectCompany } from '../common/common.selectors';
import { ChildService } from '../../../child/child.service';

@Injectable()
export class ChildEffects {
  constructor(
    private actions$: Actions,
    private childService: ChildService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveChild$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveChild),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.childService
          .createChild({ ...action.child, company: company?.id })
          .pipe(
            map((child) => {
              this.showSuccessMessage();
              this.goToChildListPage();
              return saveChildSuccess({ child });
            }),
            catchError((error) =>
              of(saveChildFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchChildList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchChildList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),
      filter(([_, __, ___, company]) => company != null),

      switchMap(([_, page, size]) =>
        this.childService.fetchChildList({ page, size }).pipe(
          map((response) => fetchChildListSuccess(response)),
          catchError((error) =>
            of(fetchChildListError({ error })).pipe(
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
      debounceTime(300),
      map(() => fetchChildList())
    )
  );

  deleteChildById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteChildById),
      mergeMap((action) =>
        this.childService.deleteChildById(action.id).pipe(
          map(() => fetchChildList()),
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

  goToChildListPage() {
    this.router.navigate(['/app/child']);
  }
}
