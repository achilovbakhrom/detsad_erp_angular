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
  deleteCashboxById,
  deleteCashboxByIdError,
  deleteCashboxSuccess,
  fetchCashboxList,
  fetchCashboxError,
  fetchCashboxSuccess,
  saveCashbox,
  saveCashboxError,
  saveCashboxSuccess,
  setPage,
  setSize,
} from './cashbox.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './cashbox.selectors';
import { selectCompany } from '../common/common.selectors';
import { SalaryService } from '../../../salary/salary.service';
import { CashboxService } from '../../../cashbox/cashbox.service';

@Injectable()
export class CashboxEffects {
  constructor(
    private actions$: Actions,
    private cashboxService: CashboxService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  createCashbox$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveCashbox),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.cashboxService
          .createCashbox({
            ...action.cashbox,
            company: company?.id,
          })
          .pipe(
            map((cashbox) => {
              this.showSuccessMessage();
              this.goToCashboxPage();
              return saveCashboxSuccess({ cashbox });
            }),

            catchError((error) =>
              of(saveCashboxError({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchCashboxList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchCashboxList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size, company]) =>
        this.cashboxService
          .fetchCashboxList({ page, size, company: company?.id })
          .pipe(
            map((response) => fetchCashboxSuccess(response)),
            catchError((error) =>
              of(fetchCashboxError({ error })).pipe(
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
      map(() => fetchCashboxList())
    )
  );

  deleteCashboxById = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteCashboxById),
      mergeMap((action) =>
        this.cashboxService.deleteCashboxById(action.id).pipe(
          mergeMap(() =>
            merge(of(fetchCashboxList()), of(deleteCashboxSuccess()))
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => deleteCashboxByIdError())
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

  goToCashboxPage() {
    this.router.navigate(['/app/cashbox']);
  }
}
