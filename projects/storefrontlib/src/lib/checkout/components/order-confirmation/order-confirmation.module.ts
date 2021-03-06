import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { OrderConfirmationComponent } from './order-confirmation.component';

import { MediaModule } from './../../../ui/components/media/media.module';
import { CartSharedModule } from './../../../cart/components/cart-shared/cart-shared.module';
import { CardModule } from '../../../ui/components/card/card.module';

@NgModule({
  imports: [CommonModule, MediaModule, CartSharedModule, CardModule],
  declarations: [OrderConfirmationComponent],
  exports: [OrderConfirmationComponent]
})
export class OrderConfirmationModule {}
