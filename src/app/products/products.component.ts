import { ShoppingCart } from './../models/shopping-cart';
import { ProductId } from './../models/app.product';
import {  ShoppingCartService } from './../shopping-cart.service';
import {  switchMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Product } from '../models/app.product';
import { Subscription, Observable } from 'rxjs';


@Component({
  selector: 'products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = []
  category: string | null = '';
  showActions = false;
  cart$!: Observable<ShoppingCart>;

  constructor(
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService,
    private route: ActivatedRoute) {

  }
  async ngOnInit() {
    let cartId = this.shoppingCartService.getOrCreateCartId();
    this.cart$ = await this.shoppingCartService.getCart(cartId);
    this.populateProducts();
  }

// PRIVATE -----------------------------------------------------

  private populateProducts() {
    this.productService.getAll()
      .pipe(
      switchMap(products => {
        this.products = products
        return this.route.queryParamMap;
      })
     ).subscribe(params => {
        this.category = params.get('category');
       this.applyFilters();

      });
  }

  private applyFilters(){
      this.filteredProducts = (this.category) ?
          this.products.filter(prod => prod.category === this.category) :
          this.products;
  }

}