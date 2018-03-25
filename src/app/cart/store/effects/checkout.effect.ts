import { Injectable } from '@angular/core';

import * as fromActions from './../actions';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect } from '@ngrx/effects';
import { map, catchError, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { OccCartService } from '../../../occ/cart/cart.service';

@Injectable()
export class CheckoutEffects {
  @Effect()
  addDeliveryAddress$: Observable<any> = this.actions$
    .ofType(fromActions.ADD_DELIVERY_ADDRESS)
    .pipe(
      map((action: fromActions.AddDeliveryAddress) => action.payload),
      mergeMap(payload =>
        this.cartService
          .createAndSetAddress(payload.userId, payload.cartId, payload.address)
          .pipe(
            map(() => {
              return new fromActions.AddDeliveryAddressSuccess();
            }),
            catchError(error =>
              of(new fromActions.AddDeliveryAddressFail(error))
            )
          )
      )
    );

  constructor(private actions$: Actions, private cartService: OccCartService) {}
}
