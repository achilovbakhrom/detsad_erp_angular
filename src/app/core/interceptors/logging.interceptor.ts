import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';
import { errorLog, infoLog } from '../../shared/utils/log';

export const loggingInterceptor: HttpInterceptorFn = (req, next) => {
  infoLog('Outgoing request', req);

  return next(req).pipe(
    tap((event) => {
      if (event instanceof HttpResponse) {
        infoLog('Incoming response', event);
      }
    }),
    catchError((error: HttpErrorResponse) => {
      errorLog('Error response', error);
      return throwError(() => new Error(error.message));
    })
  );
};
