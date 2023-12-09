import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

export const BaseService: HttpInterceptorFn = (req: HttpRequest<unknown>,
  next: HttpHandlerFn,) => {

  const token = localStorage.getItem("token=");
  if (token) {
    const clonedRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next(clonedRequest).pipe(
      catchError((error) => {
        if (error.status === 401) {
          window.location.href = 'auth/login';
        }
        return throwError(error);
      })
    );
  } else {
    return next(req).pipe(

      catchError((error) => {
        if (error.status === 401) {
          window.location.href = 'auth/login';
        }
        return throwError(error);
      })
    );
  }
};