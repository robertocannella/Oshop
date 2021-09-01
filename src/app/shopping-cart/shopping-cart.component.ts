import { ShoppingCart, ShoppingCartItem } from './../models/shopping-cart';
import { Observable } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { keyframes } from '@angular/animations';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
  
export class ShoppingCartComponent implements OnInit {
  cart$!: Observable<ShoppingCart>;
  cartPriceModel: ShoppingCartItem[] = [];
  constructor(private cartSerive: ShoppingCartService) { }
  
  async ngOnInit() {
    this.cart$ = await this.cartSerive.getCart();


// second way
    this.cart$.subscribe(x => {
      let arr = x['items']
      arr.forEach(item => {
        this.cartPriceModel.push(new ShoppingCartItem(item.product, item.quantity ));
      })
    });

/// first way

    // this.cart$.pipe(take(1)).subscribe(x => {
    //   x.items?.forEach(cartItem => {
    //     this.cartPriceModel.push(new ShoppingCartItem(cartItem.product, cartItem.quantity))
    //     console.log(this.cartPriceModel)
    //   })
    // });

  }
}
