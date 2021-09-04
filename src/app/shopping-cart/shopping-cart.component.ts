import { ShoppingCart, ShoppingCartItem } from './../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
  
export class ShoppingCartComponent implements OnInit {

  cart$!: Observable<ShoppingCartItem[]>;
  shoppingCart!: ShoppingCart;
  constructor(private cartSerive: ShoppingCartService) { }
  
  async ngOnInit() {

    let cartId = this.cartSerive.getOrCreateCartId();
    this.cart$ = await this.cartSerive.getCartItemsAsObject(cartId);
    this.cart$.subscribe((cartItems) => {
      this.shoppingCart = new ShoppingCart(cartItems);
    });
  }
}
