import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import {
  fetchAccountState,
  fetchAccountStateError,
  fetchAccountStateSuccess,
} from './account-state.actions';

import { tap } from 'ramda';
import { Router } from '@angular/router';
import { AccountStateService } from '../../../report/account-state/account-state.service';

@Injectable()
export class AccountStateEffects {
  constructor(
    private actions$: Actions,
    private accountStateService: AccountStateService,
    private notificationService: NzNotificationService,
    private router: Router
  ) {}

  fetchAccountState$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fetchAccountState),
      switchMap(() =>
        this.accountStateService.fetchAccountState().pipe(
          map((response) => fetchAccountStateSuccess(response)),
          catchError((error) =>
            of(fetchAccountStateError({ error })).pipe(
              tap(() => this.showErrorMessage(error))
            )
          )
        )
      )
    )
  );
  showErrorMessage(msg: string) {
    this.notificationService.error('Ошибка', msg);
  }
}
