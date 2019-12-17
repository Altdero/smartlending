import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class TokenInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (localStorage.getItem('token')) {
      const headers = req.headers.set('Authorization', `token ${localStorage.getItem('token')}`);
      const authReq = req.clone({ headers });

      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
