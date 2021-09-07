import { ShoppingCart } from './../models/shopping-cart';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../models/order';
import { OrderService } from '../order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy
 {
  @Input('shoppingCart') shoppingCart!: ShoppingCart;
  userSubscription!: Subscription;
  userId!: string | undefined;
 
  
form = new FormGroup({
  fullname: new FormControl('John Smith',[
    Validators.required,
    Validators.minLength(2)
  ]),
  addressLine1: new FormControl('11 Test Road',[
    Validators.required,
    Validators.minLength(3)
    ]),
  addressLine2: new FormControl('',),
  city: new FormControl('New York',[
    Validators.required,
    Validators.minLength(2)
    ]),
  state: new FormControl('NY',[
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(2)
  ]),
  zipcode: new FormControl('01010',[
    Validators.required,
    Validators.minLength(5)
    ])
})
  
 constructor(
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router) { }


  async ngOnInit() {

    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user?.uid)
  }
  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
    async placeOrder() {
    let order = new Order(this.userId, this.form.value, this.shoppingCart);
    let result = await this.orderService.storeOrder(order);
    this.router.navigate(['/order-success', result.id])
  }
  get fullname(){
    return this.form.get('fullname') as FormControl;
  }
  get addressLine1(){
    return this.form.get('addressLine1') as FormControl;
  }
  get addressLine2(){
    return this.form.get('addressLine2') as FormControl;
   }
  get city (){
    return this.form.get('city') as FormControl;
  }
  get state (){
    return this.form.get('state') as FormControl;
  }
  get zipcode (){
    return this.form.get('zipcode') as FormControl;
  }

}
