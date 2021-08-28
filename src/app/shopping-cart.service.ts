import { take } from 'rxjs/operators';
import { AngularFirestore,  } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product } from './models/app.product';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  
  constructor(private afs: AngularFirestore) {}

  private create() {
    return this.afs.collection('shopping-carts').add({
      dateCreated: new Date().getTime()
    });
  }
  async getCart() {
    let cartId = await this.getOrCreateCartId();
    return this.afs.collection('shopping-carts').ref.doc(cartId).get();

  }
  async getCartItems() {
      let cartId = await this.getOrCreateCartId();
    return this.afs.collection('shopping-carts').doc(cartId).collection('items');

  }
  private getItem(cartId: string, productId: string) {
    return this.afs.collection('shopping-carts').doc(cartId).collection('items').doc(productId);
  }

  async updateItemQuantity(product: Product, change: number) {
    let cartId = await this.getOrCreateCartId();
    // check for a reference for this product in the current shopping cart
    // if there is no reference, add it and set quantity to 1
    // otherwise, increment the quantity
    let item$ = this.getItem(cartId, product.id);
    item$.get().pipe(take(1)).subscribe((item) => {
         item$.set ({ product: product, quantity: ((item.data()?.quantity || 0)  + change) }) 
      });
  }
  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  private async getOrCreateCartId(): Promise<string>{
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result: any = await this.create();
    localStorage.setItem('cartId', result.id);
    return result.id;  
  }
}

export interface ShoppingCart{
   id: string
}