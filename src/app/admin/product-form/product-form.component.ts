import { ProductService } from './../../product.service';
import { CategoryService } from './../../category.service';
import { Component, OnInit } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { CategoryId } from 'src/app/models/app.category-id';
import { Router, ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/models/app.product';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$: Observable<CategoryId[]>;
  product: any = {}
  id;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private categoryService: CategoryService,
    private productService: ProductService) {
    this.categories$ = categoryService.getAllWithId();

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).subscribe(
        (data: any) => this.product = data
      );

    }
  }

  save(product: any) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products'])
  }
  onDelete() {
    if (!confirm('Are you sure you want to delete item?')) return;
    
    
    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}
