import { ShoppingCart } from './../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
  
export class ShoppingCartComponent implements OnInit{

  cart$!: Observable<ShoppingCart>;

  constructor(private cartSerive: ShoppingCartService) { }

  async ngOnInit() {
    let cartId = this.cartSerive.getOrCreateCartId();
    this.cart$ = await this.cartSerive.getCartV2(cartId);
  }

  clearCart() {
    let cartId = this.cartSerive.getOrCreateCartId();
    this.cartSerive.clearCart(cartId);
  }
}
