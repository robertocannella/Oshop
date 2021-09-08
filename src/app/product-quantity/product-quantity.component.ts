import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../models/app.product';
import { ShoppingCart } from '../models/shopping-cart';
import { ShoppingCartService } from '../shopping-cart.service';

@Component({
  selector: 'app-product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  @Input('product') product!: Product;
  @Input('shopping-cart') shoppingCart!: ShoppingCart;

  constructor(private cartService: ShoppingCartService) {
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
  addToCart() {
    this.cartService.addToCart(this.product);
  }

}