import { Observable, Subscription } from 'rxjs';
import { ShoppingCartService } from './../shopping-cart.service';
import { UserService } from './../user.service';
import { AuthService } from './../auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { AppUser } from '../models/app.user';
import { ShoppingCart } from '../models/shopping-cart';

@Component({
  selector: 'bs-navbar',
  templateUrl: './bs-navbar.component.html',
  styleUrls: ['./bs-navbar.component.css']
})
export class BsNavbarComponent implements OnInit {
  miniMenuToggle = false;
  isAdmin = false;
  username = '';
  shoppingCartItemCount: number = 0;
  cart$!: Observable<ShoppingCart>;

  constructor(
    public auth: AuthService,
    private userService: UserService,
    private cartService: ShoppingCartService) {
    }


  async ngOnInit() {
    this.userService.getUsername().subscribe(
      (user: AppUser) => {
        this.username = user.name;
        this.isAdmin = user.isAdmin;
      }
    );
    
    this.cart$ = await this.cartService.getCart();
  }
  toggle() {
    this.miniMenuToggle = !this.miniMenuToggle;
  }
  logout() {
    this.auth.logout();
  }

}
