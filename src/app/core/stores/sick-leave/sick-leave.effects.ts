import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { merge, of } from 'rxjs';
import {
  catchError,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  deleteSickLeaveById,
  deleteSickLeaveByIdError,
  deleteSickLeaveSuccess,
  fetchSickLeaveList,
  fetchSickLeaveError,
  fetchSickLeaveSuccess,
  saveSickLeave,
  saveSickLeaveError,
  saveSickLeaveSuccess,
  setPage,
  setSize,
} from './sick-leave.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './sick-leave.selectors';
import { selectCompany } from '../common/common.selectors';
import { SickLeaveService } from '../../../sick-leave/sick-leave.service';

@Injectable()
export class SickLeaveEffects {
  constructor(
    private actions$: Actions,
    private sickLeaveService: SickLeaveService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  createSickLeaveContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveSickLeave),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.sickLeaveService
          .createSickLeave({
            ...action.sickLeave,
            company: company?.id,
          })
          .pipe(
            map((sickLeave) => {
              this.showSuccessMessage();
              this.goToSickLeaveListPage();
              return saveSickLeaveSuccess({ sickLeave });
            }),

            catchError((error) =>
              of(saveSickLeaveError({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchSickLeaveList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSickLeaveList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size]) =>
        this.sickLeaveService
          .fetchSickLeaveList({
            page,
            size,
          })
          .pipe(
            map((response) => fetchSickLeaveSuccess(response)),
            catchError((error) =>
              of(fetchSickLeaveError({ error })).pipe(
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
      map(() => fetchSickLeaveList())
    )
  );

  deleteSickLeaveById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSickLeaveById),
      mergeMap((action) =>
        this.sickLeaveService.deleteSickLeaveById(action.id).pipe(
          mergeMap(() =>
            merge(of(fetchSickLeaveList()), of(deleteSickLeaveSuccess()))
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => deleteSickLeaveByIdError())
            )
          )
        )
      )
    )
  );

  showErrorMessage(msg: string) {
    this.notificationService.error('Ошибка', msg);
  }

  showSuccessMessage() {
    this.notificationService.success('Успешно', 'Операция прошла успешно');
  }

  goToSickLeaveListPage() {
    this.router.navigate(['/app/sick-leave']);
  }
}
