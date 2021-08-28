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
  @Input('shopping-cart') shoppingCart: any;

  constructor(private cartService: ShoppingCartService) { }
  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  addToCart() {
    this.cartService.addToCart(this.product);
  }
  getQuantity() {
    if (!this.shoppingCart) return 0;
     
    for (let key in this.shoppingCart) {
      
      let value = this.shoppingCart[key];
      if (value.product.id === this.product.id) return value.quantity
    }
      
    return 0;
    
  }
}
