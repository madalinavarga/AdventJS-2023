import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';

export const BaseService : HttpInterceptorFn = (req: HttpRequest<unknown>,
  next: HttpHandlerFn,) => {

    const token = localStorage.getItem("token") || " ";
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next(clonedRequest);
    } else {
      return next(req);
    }
};
