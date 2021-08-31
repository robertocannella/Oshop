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

  constructor(private cartService: ShoppingCartService) { }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  addToCart() {
    this.cartService.addToCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart) return 0;
    if (this.shoppingCart.items?.length === 0) return 0;


    let quantity = 0;
    this.shoppingCart.items?.forEach(element => {
      if (element.product.id === this.product.id) 
        quantity = element.quantity;
    })

    return quantity;
  }
  
}