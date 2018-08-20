import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler } from '@angular/common/http';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { switchMap, tap, filter } from 'rxjs/operators';

import * as fromStore from '../../store';
import { ClientAuthenticationToken } from '../../models/token-types.model';
import { ClientTokenState } from '../../store/reducers/client-token.reducer';

@Injectable()
export class ClientErrorHandlingService {
  constructor(private store: Store<fromStore.AuthState>) {}

  public handleExpiredClientToken(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    return this.handleExpiredToken().pipe(
      switchMap(({ token }: { token: ClientAuthenticationToken }) => {
        return next.handle(this.createNewRequestWithNewToken(request, token));
      })
    );
  }

  private handleExpiredToken(): Observable<any> {
    return this.store.select(fromStore.getClientTokenState).pipe(
      tap((state: ClientTokenState) => {
        if (!state.loading) {
          this.store.dispatch(new fromStore.LoadClientToken());
        }
      }),
      filter((state: ClientTokenState) => state.loaded)
    );
  }

  private createNewRequestWithNewToken(
    request: HttpRequest<any>,
    token: ClientAuthenticationToken
  ): HttpRequest<any> {
    request = request.clone({
      setHeaders: {
        Authorization: `${token.token_type} ${token.access_token}`
      }
    });
    return request;
  }
}