import { Observable, pipe } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Product, ProductId } from './models/app.product';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private afs: AngularFirestore) { }

  create(product: any) {
    return this.afs.collection<ProductId>('products').doc().set(product);
  }
  getAll(): Observable<ProductId[]> {
    return this.afs.collection('products').snapshotChanges().pipe(
            map((actions: any) => {
              return actions.map((a: any) => {
                    const object = a.payload.doc.data() as ProductId;
                    object.id = a.payload.doc.id;
                    return object;
        });
    }))
  }
  
  get(id: any) {
    return this.afs.collection('products').doc(id).valueChanges();
  }
  update(productId: string, product: Product){
    return this.afs.collection('products').doc(productId).update(product);
  }
  delete(productId: any) {
    return this.afs.collection('products').doc(productId).delete();
  }
}