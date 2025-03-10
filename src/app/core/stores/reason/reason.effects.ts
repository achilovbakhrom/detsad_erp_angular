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
  deleteReasonById,
  fetchReasonList,
  fetchReasonListError,
  fetchReasonListSuccess,
  saveReason,
  saveReasonFailure,
  saveReasonSuccess,
  setPage,
  setSize,
} from './reason.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './reason.selectors';
import { selectCompany } from '../common/common.selectors';
import { ReasonService } from '../../../reason/reason.service';

@Injectable()
export class ReasonEffects {
  constructor(
    private actions$: Actions,
    private reasonService: ReasonService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveReason$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveReason),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.reasonService
          .createReason({ ...action.reason, company: company?.id })
          .pipe(
            map((reason) => {
              this.showSuccessMessage();
              this.goToReasonListPage();
              return saveReasonSuccess({ reason });
            }),

            catchError((error) =>
              of(saveReasonFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchReasonList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchReasonList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize)
      ),

      switchMap(([_, page, size]) =>
        this.reasonService.fetchReasonList({ page, size }).pipe(
          map((response) => fetchReasonListSuccess(response)),
          catchError((error) =>
            of(fetchReasonListError({ error })).pipe(
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
      map(() => fetchReasonList())
    )
  );

  deleteReasonById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteReasonById),
      mergeMap((action) =>
        this.reasonService.deleteReasonById(action.id).pipe(
          map(() => fetchReasonList()),
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
    this.notificationService.success('Успешно', 'Причина создана успешно');
  }

  goToReasonListPage() {
    this.router.navigate(['/app/reason']);
  }
}
