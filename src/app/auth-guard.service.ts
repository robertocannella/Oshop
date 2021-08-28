import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>
  {
    return this.auth.user$.pipe(
      map(user => {
        if (user) {
          return true;
        } else {
          this.router.navigate(['login'], { queryParams: { returnURL: state.url } })
          return false;
        }
      }), catchError(err => {
        this.router.navigate(['/unknownErrorNotImplemented'])
        return of(false);
      })
    );
  }
}
