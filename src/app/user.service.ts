import { AuthService } from './auth.service';
import { EMPTY,  Observable,  } from 'rxjs';
import firebase from 'firebase/app';
import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { AppUser } from './models/app.user';
import { map, switchMap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private db: AngularFirestore,
    private auth: AuthService
  ) {}


  
  save(user: firebase.User) {
    const userRef = this.db.doc('/users/' + user.uid);
    
    userRef.set({
      name: user.displayName,
      email: user.email
    },
      { merge: true }
    );
  }

  getUserById(uid: string): Observable<any> {
    return this.db.doc("/users/" + uid).valueChanges()
  }

  getUsername(): Observable<any>{
        return this.auth.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.getUserById(user.uid)
        }
        else { return EMPTY}
      }),
          map((appUser: AppUser) => {
            return appUser;
          }));
  }
  //  getUser(): Observable<any> {
  //    return this.auth.user$.pipe(
  //     switchMap(user => {
  //       if (user) {
  //         return from(this.db.doc("/users/" + user.uid).valueChanges());
  //       } else {
  //         return EMPTY;
  //       }
  //     })
  //   );
  //}


    

    // this.db.collection('/users/').doc(user.uid).update({
    //   name: user.displayName,
    //   email: user.email
    // });

    //this.db.collection('/users' + user.uid).add()
}
