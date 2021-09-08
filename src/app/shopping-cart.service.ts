import { map, take } from 'rxjs/operators';
import { AngularFirestore} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product} from './models/app.product';
import { ShoppingCart, ShoppingCartItem } from './models/shopping-cart';
import { Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {
  subscription!: Subscription;
  constructor(private afs: AngularFirestore) { }


  async removeFromCart(product: Product) {
    this.updateItemQuantity(product, -1);
  }

  async addToCart(product: Product) {
    this.updateItemQuantity(product, 1);
  }

  getOrCreateCartId(){
    let cartId = localStorage.getItem('cartId'); 
    if (cartId) return cartId;
   
    cartId = this.afs.createId();
    localStorage.setItem('cartId', cartId);
    return cartId;
  }

  async clearCart() {
    let cartId = this.getOrCreateCartId();
    let $items = await this.getCartItems(cartId);
    this.subscription = $items.pipe(take(1)).subscribe((x: Array<any>) => {
      x.forEach((item: any) =>
        this.afs.collection('shopping-carts').doc(cartId).collection('items')
          .doc(item.product.id).delete());
    });
  }
  
  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = this.getOrCreateCartId();
    return this.afs.collection('shopping-carts').doc(cartId).collection('items').snapshotChanges().pipe(
        map((actions: any) => {
                return actions.map((a: any) => {
                  let product = a.payload.doc.data()['product'];
                  let quantity = a.payload.doc.data()['quantity'];
                    return new ShoppingCartItem(product, quantity);
          })
        }),map((data) => new ShoppingCart(data))
      )
 }
  
// PRIVATE -----------------------------------------------------

  private async getCartItems(cartId: string) {
    return this.afs.collection('shopping-carts').doc(cartId).collection('items').valueChanges();

  }
  private getItem(cartId: string, productId: string) {
    return this.afs.collection('shopping-carts').doc(cartId).collection('items').doc(productId);
  }

  private async updateItemQuantity(product: Product, change: number) {
    let cartId = this.getOrCreateCartId();
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

}

