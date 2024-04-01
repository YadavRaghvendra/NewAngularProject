import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms'; 
import { ProductService } from '../../services/product.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.css'
})
export class AddProductComponent implements OnInit {
  form!: FormGroup; 
  constructor(private productService: ProductService, private route: Router,private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm(); 
  }

  initializeForm(): void {
    this.form = this.formBuilder.group({
      productName: ['', Validators.required],
      productDescription: ['', Validators.required],
      productPrice: ['', Validators.required],
      productStock: ['', Validators.required] 
    });
  }

  addProduct(): void {
    if (this.form.valid) { 
      debugger;
      this.productService.createProduct(this.form.value).subscribe({
        next: (res: any) => {
          debugger;
          console.log('Product created successfully!');
        },
        error: (error: any) => {
          console.error('Error creating product:', error);
        }
      });
    } else {
      console.error('Form is invalid. Please check the form fields.');
    }
  }
  goToListPage(): void {
    this.route.navigate(['/']);
  }
}
