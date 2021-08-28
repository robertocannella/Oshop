import { ActivatedRoute } from '@angular/router';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from 'rxjs';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User|null>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider())
  }
  logout() {
    this.afAuth.signOut();
  }

        
}

