import { map, take } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product } from './models/app.product';
import { ShoppingCart, ShoppingCartId, ShoppingCartItem } from './models/shopping-cart';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  constructor(private afs: AngularFirestore) {
 
  }

  async getCart(cartId: string) : Promise<Observable<ShoppingCart>>{
    return this.afs.collection('shopping-carts').doc(cartId).collection<ShoppingCartItem>('items').valueChanges({idField: 'id'}).pipe(
      map(items => {
        return new ShoppingCart(items);
      })
    );
  }
// Currently this ShoppingCartItem is mapped into a ShoppingCart object from calling component.
// Look to use rxjs operators to accomplish all of the logic here, possible store the array inside
// one observable and supply it to the next as a parameter- Roberto Cannella
  
  async getCartItemsAsObject(cartId: string): Promise<Observable<ShoppingCartItem[]>> {
    return this.afs.collection('shopping-carts').doc(cartId).collection('items').snapshotChanges().pipe(
      map((actions: any) => {
        return actions.map((a: any) => {
          let product = a.payload.doc.data()['product'];
          let quantity = a.payload.doc.data()['quantity'];
          return new ShoppingCartItem(product, quantity);
        })
      })
    );
  }

  
  async getCartItems(cartId: string) {
    return this.afs.collection('shopping-carts').doc(cartId).collection('items').valueChanges();

  }
  private getItem(cartId: string, productId: string) {
    return this.afs.collection('shopping-carts').doc(cartId).collection('items').doc(productId);
  }

  async updateItemQuantity(product: Product, change: number, cartId: string) {
    // check for a reference for this product in the current shopping cart
    // if there is no reference, add it and set quantity to 1
    // otherwise, increment the quantity
    let item$ = this.getItem(cartId, product.id);
    item$.get().pipe(take(1)).subscribe((item) => {
      let quantity = ((item.data()?.quantity || 0) + change);
      if (quantity === 0) item$.delete();
      else item$.set({
        product: product,
        quantity: quantity
      })
      });
  }
  async removeFromCart(product: Product, cartId: string) {
    this.updateItemQuantity(product, -1, cartId);
  }

  async addToCart(product: Product, cartId: string) {
    this.updateItemQuantity(product, 1, cartId);
  }
  getCartId() {
    let cartId = localStorage.getItem('cartId');
    console.log(cartId);
    return cartId;
  }
  getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId');
    if (!cartId) {
      cartId = this.afs.createId();
      localStorage.setItem('cartId', cartId)
      console.log("updated cart Id")
      return cartId
    } 
      
    return cartId;
  }
}

