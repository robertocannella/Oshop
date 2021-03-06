import { MatSort } from '@angular/material/sort';
import { ProductService } from './../../product.service';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { Product, ProductId } from 'src/app/models/app.product';
import { Subscription } from 'rxjs'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatTable } from '@angular/material/table';
@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {

  products: ProductId[] = [];
  displayedColumns:string[] = ['id','category','title','price'];
  subscription: Subscription;
  dataSource!: MatTableDataSource<Product>;
  
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatTable) table!: MatTable<Product>;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll().subscribe(
      (p) => {
        this.products = p;
        this.dataSource = new MatTableDataSource(this.products);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.table.dataSource = this.dataSource;
      });
    }
    
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
 
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
