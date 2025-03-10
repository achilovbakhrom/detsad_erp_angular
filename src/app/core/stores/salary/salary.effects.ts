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
  deleteSalaryById,
  deleteSalaryByIdError,
  deleteSalarySuccess,
  fetchSalaryList,
  fetchSalaryError,
  fetchSalarySuccess,
  saveSalary,
  saveSalaryError,
  saveSalarySuccess,
  setPage,
  setSize,
} from './salary.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './salary.selectors';
import { selectCompany } from '../common/common.selectors';
import { SalaryService } from '../../../salary/salary.service';

@Injectable()
export class SalaryEffects {
  constructor(
    private actions$: Actions,
    private salaryService: SalaryService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  createSalaryContract$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveSalary),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.salaryService
          .createSalary({
            ...action.salary,
            company: company?.id,
          })
          .pipe(
            map((salary) => {
              this.showSuccessMessage();
              this.goToSalaryListPage();
              return saveSalarySuccess({ salary });
            }),

            catchError((error) =>
              of(saveSalaryError({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchSalaryList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchSalaryList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize)
      ),

      switchMap(([_, page, size]) =>
        this.salaryService.fetchSalaryList({ page, size }).pipe(
          map((response) => fetchSalarySuccess(response)),
          catchError((error) =>
            of(fetchSalaryError({ error })).pipe(
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
      map(() => fetchSalaryList())
    )
  );

  deleteSalaryById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteSalaryById),
      mergeMap((action) =>
        this.salaryService.deleteSalaryById(action.id).pipe(
          mergeMap(() =>
            merge(of(fetchSalaryList()), of(deleteSalarySuccess()))
          ),
          catchError((error) =>
            of().pipe(
              tap(() => this.showErrorMessage(error)),
              map(() => deleteSalaryByIdError())
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

  goToSalaryListPage() {
    this.router.navigate(['/app/salary']);
  }
}
