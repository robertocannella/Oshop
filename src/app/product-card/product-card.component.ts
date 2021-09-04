import { ShoppingCart, ShoppingCartId } from './../models/shopping-cart';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, Input} from '@angular/core';
import { Product } from '../models/app.product';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent  {
  @Input('product') product!: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  cartId;
    constructor(private cartService: ShoppingCartService) {
      this.cartId = this.cartService.getOrCreateCartId();
  }

  addToCart() {
    
    this.cartService.addToCart(this.product, this.cartId);
  }
  
}