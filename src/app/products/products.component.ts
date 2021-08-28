import {  ShoppingCartService } from './../shopping-cart.service';
import {  switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../models/app.product';
import {  Subscription } from 'rxjs';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy{
  products: Product[] = [];
  filteredProducts: Product[] = []
  category: string | null = '';
  showActions = false;
  cart: any;
  subcription= new  Subscription;


  constructor(
    productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    route: ActivatedRoute) {
    
  
    
    productService.getAll()
      .pipe(
      switchMap(products => {
        this.products = products
        return route.queryParamMap;
      })
     ).subscribe(params => {
        this.category = params.get('category');
      
        this.filteredProducts = (this.category) ?
          this.products.filter(prod => prod.category === this.category) :
          this.products;
      });
  }
 async ngOnInit() {
   this.subcription = (await this.shoppingCartService
     .getCartItems()).valueChanges().subscribe(cart => this.cart = cart);
  
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }
}