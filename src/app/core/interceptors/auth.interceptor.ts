import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, exhaustMap, Observable, of, take, throwError } from 'rxjs';
import { toBearer } from '../../shared/utils/helpers';
import { Store } from '@ngrx/store';
import { AppState } from '../stores/types';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store<AppState>);

  return store.select('auth').pipe(
    take(1),
    exhaustMap((authState) => {
      let clonedRequest = req;

      if (authState && authState.accessToken) {
        clonedRequest = req.clone({
          setHeaders: {
            Authorization: toBearer(authState.accessToken),
          },
        });
      }

      return next(clonedRequest).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            return handle401Error(req, next);
          }
          return throwError(() => new Error(error.message));
        })
      );
    })
  );
};

const handle401Error: HttpInterceptorFn = (req, next) => {
  return of();
};
