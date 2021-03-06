import { OccProductService } from './../../../occ/product/product.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { hot, cold } from 'jasmine-marbles';
import { Observable, of } from 'rxjs';
import { OccModuleConfig } from '../../../occ/occ-module-config';

import * as fromEffects from '../effects/product-reviews.effect';
import * as fromActions from '../actions/product-reviews.action';
import { provideMockActions } from '@ngrx/effects/testing';

const reviewData = {
  reviews: [
    {
      id: 1,
      rating: 3
    },
    {
      id: 2,
      rating: 5
    }
  ]
};

const MockOccModuleConfig: OccModuleConfig = {
  server: {
    baseUrl: '',
    occPrefix: ''
  }
};

describe('Product reviews effect', () => {
  let actions$: Observable<any>;
  let service: OccProductService;
  let effects: fromEffects.ProductReviewsEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        OccProductService,
        { provide: OccModuleConfig, useValue: MockOccModuleConfig },
        fromEffects.ProductReviewsEffects,
        provideMockActions(() => actions$)
      ]
    });

    service = TestBed.get(OccProductService);
    effects = TestBed.get(fromEffects.ProductReviewsEffects);

    spyOn(service, 'loadProductReviews').and.returnValue(of(reviewData));
  });

  describe('loadProductReveiws$', () => {
    it('should return specified product reviews', () => {
      const productCode = '12345';
      const action = new fromActions.LoadProductReviews(productCode);
      const completion = new fromActions.LoadProductReviewsSuccess({
        productCode,
        list: reviewData.reviews
      });

      actions$ = hot('-a', { a: action });
      const expected = cold('-b', { b: completion });

      expect(effects.loadProductReviews$).toBeObservable(expected);
    });
  });
});
