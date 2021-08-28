import { Observable } from 'rxjs';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Category } from './models/app.category';
import { map } from 'rxjs/operators';
import { CategoryId } from './models/app.category-id';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  itemsCollection: AngularFirestoreCollection<CategoryId>;

  constructor(private db: AngularFirestore) {
    this.itemsCollection = db.collection<CategoryId>('categories');
  }
  
  getAll() {
    return this.itemsCollection.valueChanges();
  }
  getAllWithId() {  
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    return this.itemsCollection
      .snapshotChanges()
      .pipe(
      map((actions: any) => {
        return actions.map((a: any) => {
              const object = a.payload.doc.data() as CategoryId;
              object.id = a.payload.doc.id;
              return object;
          
          //const data = a.payload.doc.data() as Category;
          //const id: string = a.payload.doc.id;
          //return { id, ...data };
        });
      })
    )
  }
  //this method not tested...
  addItem(category: CategoryId) {
    this.itemsCollection.add(category);
  }
}
