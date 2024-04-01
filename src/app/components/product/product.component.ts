import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router'

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [MatTableModule,CommonModule,HttpClientModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{

  constructor(private productService: ProductService,private router:Router) {} // Inject ProductService
  currentProduct?: Product;
  products: any[] = [];
  currentPage: number = 1;
  PageSize: number = 10; // Change this as per your requirement
  totalItems: number = 0;
  ngOnInit(): void {
   this.Pagination(this.currentPage);
  }
  getProducts(): void {
    debugger;
    this.productService.getAllProduct().subscribe({
      next: (data) => {
        debugger;
        this.products = data;
        console.log(this.products);
      },
      error: (e) => console.error(e)
    });
  }
  getProduct(id: any): void {
    debugger;
    this.productService.getProductById(id).subscribe({
      next: (data) => {
        debugger;
        this.currentProduct = data;
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }
  deleteProduct(id: any): void {
    debugger;
    this.productService.deleteProduct(id).subscribe({
      next: (data) => {
        debugger;
        this.currentProduct = data;
        this.Pagination(this.currentPage);
        console.log(data);
      },
      error: (e) => console.error(e)
    });
  }

  editProduct(product: any): void {
    debugger;
    // Assuming product.id contains the ID of the product to be edited
    this.router.navigate(['/edit', product]); // Navigate to the edit page with the product ID as a parameter
  }
  
  
  Pagination(pageNumber: number) {
    this.productService.pagination(this.PageSize, pageNumber).subscribe(data => {
      this.products = data; 
      this.totalItems = data.length; 
      
    });
  }
  

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.PageSize);
  }

  nextPage() {
    debugger;
    if ((this.currentPage * this.PageSize)) {
     this.currentPage++;
      this.Pagination(this.currentPage);
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.Pagination(this.currentPage);
    }
  }
  goToaddproduct(): void {
    this.router.navigate(['/addproduct']);
  }
}
