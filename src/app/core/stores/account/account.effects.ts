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
  deleteAccountById,
  fetchAccountList,
  fetchAccountListError,
  fetchAccountListSuccess,
  saveAccount,
  saveAccountFailure,
  saveAccountSuccess,
  setPage,
  setSize,
} from './account.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../types';
import { selectPage, selectSize } from './account.selectors';
import { selectCompany } from '../common/common.selectors';
import { AccountService } from '../../../account/account.service';

@Injectable()
export class AccountEffects {
  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    private notificationService: NzNotificationService,
    private router: Router,
    private store: Store<AppState>
  ) {}

  saveAccount$ = createEffect(() =>
    this.actions$.pipe(
      ofType(saveAccount),
      withLatestFrom(this.store.select(selectCompany)),
      mergeMap(([action, company]) =>
        this.accountService
          .createAccount({ ...action.account, company: company?.id })
          .pipe(
            map((account) => {
              this.showSuccessMessage();
              this.goToAccountListPage();
              return saveAccountSuccess({ account });
            }),

            catchError((error) =>
              of(saveAccountFailure({ error })).pipe(
                tap(() => this.showErrorMessage(error))
              )
            )
          )
      )
    )
  );

  fetchAccountList$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAccountList),
      withLatestFrom(
        this.store.select(selectPage),
        this.store.select(selectSize),
        this.store.select(selectCompany)
      ),

      switchMap(([_, page, size]) =>
        this.accountService.fetchAccountList({ page, size }).pipe(
          map((response) => fetchAccountListSuccess(response)),
          catchError((error) =>
            of(fetchAccountListError({ error })).pipe(
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
      map(() => fetchAccountList())
    )
  );

  deleteAccountById$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteAccountById),
      mergeMap((action) =>
        this.accountService.deleteAccountById(action.id).pipe(
          map(() => fetchAccountList()),
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
    this.notificationService.success('Успешно', 'Счет создан успешно');
  }

  goToAccountListPage() {
    this.router.navigate(['/app/account']);
  }
}
