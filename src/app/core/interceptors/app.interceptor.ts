// app.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export const appInterceptor: HttpInterceptorFn = (req, next) => {
  const clonedRequest = req.clone({
    url: `${environment.apiBaseUrl}${req.url}`,
  });

  return next(clonedRequest);
};
