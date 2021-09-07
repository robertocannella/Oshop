import { ShoppingCartService } from './shopping-cart.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private afs: AngularFirestore, private cartService: ShoppingCartService) { }

  async storeOrder(order: any) {
    let cartId = this.cartService.getOrCreateCartId();

    // Firestore does not support custom objects.  
    // Use Object Assign to trasnform into standard javascript object
    let result = await this.afs.collection('orders').add(Object.assign({}, order));
    this.cartService.clearCart(cartId);
    return result;

  }
}
