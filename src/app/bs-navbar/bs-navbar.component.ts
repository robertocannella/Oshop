import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { Component } from '@angular/core';
import { AppUser } from '../models/app.user';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent {
  isActive = false;
  isAdmin = false;
  username = '';

  constructor(public auth: AuthService, private userService: UserService){
    this.userService.getUsername().subscribe(
      (user: AppUser) => {
        this.username = user.name;
        this.isAdmin = user.isAdmin;
      }
    );
  }
  toggle() {
    this.isActive = !this.isActive;
  }
  logout() {
    this.auth.logout();
  }

}
