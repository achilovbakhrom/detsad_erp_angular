import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  catchError,
  exhaustMap,
  Observable,
  switchMap,
  take,
  throwError,
  of,
} from 'rxjs';
import { toBearer } from '../../shared/utils/helpers';
import { Store } from '@ngrx/store';
import { AppState } from '../stores/types';
import { refreshTokenSuccess } from '../stores/auth/auth.actions';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const store = inject(Store<AppState>);
  const http = inject(HttpClient);
  const router = inject(Router);

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
        catchError((error: any) => {
          console.log(
            'HTTP Error occurred:',
            error.message,
            error instanceof HttpErrorResponse
          ); // Debugging
          if (error.message?.includes('401')) {
            console.log('Detected 401, attempting refresh token'); // Debugging
            return handle401Error(req, next, http, store, router);
          }
          return throwError(() => error); // Throw the error to propagate it
        })
      );
    })
  );
};

const handle401Error = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
  http: HttpClient,
  store: Store<AppState>,
  router: Router
): Observable<HttpEvent<unknown>> => {
  return store.select('auth').pipe(
    take(1),
    switchMap((authState) => {
      if (!authState.refreshToken) {
        console.log('No refresh token, redirecting to login'); // Debugging
        router.navigate(['/auth/login']);
        return throwError(() => new Error('No refresh token available'));
      }

      return http
        .post<{ access: string }>('user/login/refresh/', {
          refresh: authState.refreshToken,
        })
        .pipe(
          switchMap((response) => {
            console.log('Refresh token succeeded:', response); // Debugging
            store.dispatch(
              refreshTokenSuccess({
                accessToken: response.access,
              })
            );

            const clonedRequest = req.clone({
              setHeaders: {
                Authorization: toBearer(response.access),
              },
            });
            return next(clonedRequest);
          }),
          catchError((refreshError) => {
            console.log('Refresh token failed, redirecting to login'); // Debugging
            router.navigate(['/auth/login']);
            return throwError(() => refreshError);
          })
        );
    })
  );
};
