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
  delay,
  withLatestFrom,
} from 'rxjs';
import { toBearer } from '../../shared/utils/helpers';
import { Store } from '@ngrx/store';
import { AppState } from '../stores/types';
import { refreshTokenSuccess } from '../stores/auth/auth.actions';
import { selectCompany } from '../stores/common/common.selectors';

export const tokenInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const store = inject(Store<AppState>);
  const http = inject(HttpClient);
  const router = inject(Router);

  return store.select('auth').pipe(
    take(1),
    withLatestFrom(store.select(selectCompany)),
    exhaustMap(([authState, currentCompany]) => {
      let clonedRequest = req;
      console.log('authState?.accessToken', authState?.accessToken);
      if (authState?.accessToken != null) {
        clonedRequest = req.clone({
          setHeaders: {
            Authorization: toBearer(authState.accessToken),
          },
        });
      }

      if (currentCompany != null) {
        clonedRequest = clonedRequest.clone({
          setHeaders: {
            'X-TENANT-ID': String(currentCompany.id),
          },
        });
      }

      return next(clonedRequest).pipe(
        catchError((error: any) => {
          if (error.message?.includes('401')) {
            if (error.message.includes('/login/refresh')) {
              router.navigate(['/auth/login']);
            } else {
              return handle401Error(req, next, http, store, router);
            }
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
    delay(3000),
    take(1),
    switchMap((authState) => {
      if (!authState.refreshToken) {
        router.navigate(['/auth/login']);
        return throwError(() => new Error('No refresh token available'));
      }

      return http
        .post<{ access: string }>('user/login/refresh/', {
          refresh: authState.refreshToken,
        })
        .pipe(
          switchMap((response) => {
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
            router.navigate(['/auth/login']);
            return throwError(() => refreshError);
          })
        );
    }),
    catchError((err) => {
      router.navigate(['/auth/login']);
      return throwError(() => err);
    })
  );
};
