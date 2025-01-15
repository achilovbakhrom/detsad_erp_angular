import { Injectable, NgZone } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '../../services/auth.service';
import * as AuthActions from './auth.actions';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      mergeMap(({ username, password }) =>
        this.authService.login(username, password).pipe(
          map((response) =>
            AuthActions.loginSuccess({
              access: response.access,
              refresh: response.refresh,
            })
          ),
          tap(() => {
            this.router.navigate(['app']);
          }),
          catchError((error) => {
            return of(
              AuthActions.loginFailure({
                error: 'Неправильный логин или пароль',
              })
            );
          })
        )
      )
    )
  );

  refresh$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      mergeMap(() =>
        this.authService.refreshToken().pipe(
          map((accessToken) =>
            AuthActions.refreshTokenSuccess({ accessToken })
          ),
          catchError((error) =>
            of(AuthActions.refreshTokenFailure({ error: error.message }))
          )
        )
      )
    )
  );
}
