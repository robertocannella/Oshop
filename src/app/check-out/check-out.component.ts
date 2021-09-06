import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCart, ShoppingCartItem } from '../models/shopping-cart';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit, OnDestroy{
  cart$!: Observable<ShoppingCartItem[]>;
  shoppingCart!: ShoppingCart;
  subscription!: Subscription;

  constructor(private cartService: ShoppingCartService) { }

  async ngOnInit() {
    let cartId = this.cartService.getOrCreateCartId();
    this.cart$ = await this.cartService.getCartItemsAsObject(cartId);

    this.subscription = this.cart$.subscribe((shoppingCartItemArray: ShoppingCartItem[]) => {
      this.shoppingCart = new ShoppingCart(shoppingCartItemArray);
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }




}
