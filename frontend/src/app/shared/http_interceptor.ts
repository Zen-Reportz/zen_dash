import { Inject, Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { DOCUMENT } from '@angular/common';
import { DataService } from '../services/data.service';
import { ResponseData } from './application_data';

@Injectable()
export class PostInterceptor implements HttpInterceptor {

  constructor(private cookie: CookieServiceDelete, private data: DataService) {}
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.method === 'POST') {
      return next.handle(request).pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.cookie.deleteCookie('auth_token')
            this.data.reset_data()
          }
          // Always return the error so that the application can also handle it
          return throwError(error);
        })
      );
    }
    // If it's not a POST request, don't handle it in this interceptor
    return next.handle(request);
  }
}


@Injectable()
export class CookieServiceDelete {
  constructor(@Inject(DOCUMENT) private document: Document) { }

  deleteCookie(name: string) {
    this.document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}
