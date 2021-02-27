import { AuthService } from './auth.service';
import { HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { take, exhaustMap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import * as fromApp from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.store.select('auth').pipe(
      take(1),
      map(authState => authState.user),
      exhaustMap(user => {
        if (user == null) {
          return next.handle(req);
        }
        const modifiedRequest = req.clone({ params: new HttpParams().set('auth', user.token) });
        return next.handle(modifiedRequest);
      })
    );

  }
}
