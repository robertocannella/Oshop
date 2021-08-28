import { CategoryId } from './models/app.category-id';
import { Category } from 'src/app/models/app.category';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Observable, pipe } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  constructor(
    private userService: UserService,
    private auth: AuthService,
    private router: Router
   ) {
    

    auth.user$
      .subscribe(user => {
        if (!user) return;
          
        userService.save(user);
        let returnUrl = localStorage.getItem('returnUrl');
        
        if (!returnUrl) return;

        localStorage.removeItem('returnUrl');
        router.navigateByUrl(returnUrl as string);
          
        });
  }
}
