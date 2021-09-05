import { ShoppingCart, ShoppingCartItem } from './../models/shopping-cart';
import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
  
export class ShoppingCartComponent implements OnInit, OnDestroy {

  cart$!: Observable<ShoppingCartItem[]>;
  shoppingCart!: ShoppingCart;
  subscription!: Subscription;
  isEmpty = true;

  constructor(private cartSerive: ShoppingCartService) { }

  async ngOnInit() {

    let cartId = this.cartSerive.getOrCreateCartId();
    this.cart$ = await this.cartSerive.getCartItemsAsObject(cartId);

    this.subscription = this.cart$.subscribe((shoppingCartItemArray: ShoppingCartItem[]) => {
      this.shoppingCart = new ShoppingCart(shoppingCartItemArray);
      console.log(this.shoppingCart)
      this.isEmpty = (this.shoppingCart.totalItemsCount == 0);
    });

    
  }

  clearCart() {
    let cartId = this.cartSerive.getOrCreateCartId();
    this.cartSerive.clearCart(cartId);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
