import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { throwError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { OccModuleConfig } from '../occ-module-config';

import { UserRegisterFormData } from '../../user/models/user.model';

import { InterceptorUtil, USE_CLIENT_TOKEN } from '../utils/interceptor-util';

const USER_ENDPOINT = 'users/';
const ADDRESSES_VERIFICATION_ENDPOINT = '/addresses/verification';
const ADDRESSES_ENDPOINT = '/addresses';
const PAYMENT_DETAILS_ENDPOINT = '/paymentdetails';

@Injectable()
export class OccUserService {
  // some extending from baseservice is not working here...
  constructor(protected http: HttpClient, protected config: OccModuleConfig) {}

  public loadUser(userId: string): Observable<any> {
    const url = this.getUserEndpoint() + userId;
    return this.http
      .get(url)
      .pipe(catchError((error: any) => throwError(error)));
  }

  verifyAddress(userId, address) {
    const url =
      this.getUserEndpoint() + userId + ADDRESSES_VERIFICATION_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .post(url, address, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  loadUserAddresses(userId) {
    const url = this.getUserEndpoint() + userId + ADDRESSES_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  loadUserPaymentMethods(userId) {
    const url = this.getUserEndpoint() + userId + PAYMENT_DETAILS_ENDPOINT;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    return this.http
      .get(url, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  registerUser(user: UserRegisterFormData): Observable<any> {
    const url = this.getUserEndpoint();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    headers = InterceptorUtil.createHeader(USE_CLIENT_TOKEN, true, headers);

    return this.http
      .post(url, user, { headers })
      .pipe(catchError((error: any) => throwError(error)));
  }

  protected getUserEndpoint() {
    return (
      (this.config.server.baseUrl || '') +
      this.config.server.occPrefix +
      this.config.site.baseSite +
      '/' +
      USER_ENDPOINT
    );
  }
}
