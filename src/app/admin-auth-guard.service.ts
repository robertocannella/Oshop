import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';
import { EMPTY } from "rxjs";
import { AppUser } from './models/app.user';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate{

  constructor(
    private auth: AuthService,
    private userservice: UserService,
  ) { }

  canActivate(): Observable<boolean> {
    return this.auth.user$.pipe(
      switchMap((user) => {
        if (user) {
          return this.userservice.getUserById(user.uid)
        }
        else { return EMPTY}
      }),
      map((appUser: AppUser) => appUser.isAdmin));
  }
}
    
  

