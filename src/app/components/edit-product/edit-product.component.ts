import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-product.component.html',
  styleUrl: './edit-product.component.css'
})
export class EditProductComponent implements OnInit {
  product?: Product;
  form!: FormGroup;

  constructor(private route: ActivatedRoute,private router:Router, private productService: ProductService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      productId:[''],
      productName: [''],
      productDescription: [''],
      productPrice: [''],
      productStock: ['']
    });
    this.route.params.subscribe(params => {
      // Update form values with product details
      this.form.patchValue({
        productId:params['productId'],
        productName: params['productName'],
        productDescription: params['productDescription'],
        productPrice: params['productPrice'],
        productStock: params['productStock'],
      });
    });

  }



  saveChanges(): void {
    debugger;
    if (this.form.valid) {
      debugger;
      this.productService.updateProduct(this.form.value).subscribe({
        next: (res: any) => {
          debugger;
          console.log('Product updates successfully!');
          this.goToListPage();
        },
        error: (error: any) => {
          console.error('Error updating product:', error);
        }
      });
    } else {
      console.error('Form is invalid. Please check the form fields.');
    }

  }
  
  goToListPage(): void {
    this.router.navigate(['/']);
  }
}
