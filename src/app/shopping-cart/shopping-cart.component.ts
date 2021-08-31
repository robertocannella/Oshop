import { ShoppingCart } from './../models/shopping-cart';
import { Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
  
export class ShoppingCartComponent implements OnInit, OnDestroy {
  cart!: ShoppingCart
  subscription = new Subscription;
 
  
constructor(private cartSerive: ShoppingCartService) { }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


async ngOnInit() {
   this.subscription = (await this.cartSerive
     .getCart()).subscribe(cart => {
       this.cart = cart
       console.log('Shopping Cart: ',cart)
     } );
  
  }
}
