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
  deletePositionById,
  fetchPositionList,
  fetchPositionListError,
  fetchPositionListSuccess,
  savePosition,
  savePositionFailure,
  savePositionSuccess,
  setPage,
  setSize,
} from './position.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './position.selectors';
import { selectCompany } from '../common/common.selectors';
import { PositionService } from '../../../position/position.service';

@Injectable()
export class PositionEffects {
  constructor(
    private actions$: Actions,
    private positionService: PositionService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  savePosition$ = createEffect(() =>
    this.actions$.pipe(
      ofType(savePosition),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.positionService
          .createPosition({ ...action.position, company: company?.id })
          .pipe(
            map((position) => {
              this.showSuccessMessage();
              this.goToPositionListPage();
              return savePositionSuccess({ position });
            }),

            catchError((error) =>
              of(savePositionFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchPositionList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchPositionList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.positionService
          .fetchPositionList({ page, size, company: company?.id })
          .pipe(
            map((response) => fetchPositionListSuccess(response)),
            catchError((error) =>
              of(fetchPositionListError({ error })).pipe(
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
      map(() => fetchPositionList())
    )
  );

  deletePositionById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deletePositionById),
      mergeMap((action) =>
        this.positionService.deletePositionById(action.id).pipe(
          map(() => fetchPositionList()),
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
    this.notificationService.success('Успешно', 'Позиция создана успешно');
  }

  goToPositionListPage() {
    this.router.navigate(['/app/position']);
  }
}
