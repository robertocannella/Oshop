import { ShoppingCart, ShoppingCartId } from './../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-success',
  templateUrl: './order-success.component.html',
  styleUrls: ['./order-success.component.css']
})
export class OrderSuccessComponent implements OnInit {
  cart$!: Observable<ShoppingCart>;
  subscription!: Subscription;
  
  constructor(private cartServce: ShoppingCartService) { }

  async ngOnInit() {
    let cartId = this.cartServce.getOrCreateCartId()
    this.cart$ = await this.cartServce.getCartV2(cartId);
  }

}
