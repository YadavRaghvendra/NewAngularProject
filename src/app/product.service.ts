import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  createProduct(newProduct: any) {
    throw new Error('Method not implemented.');
  }

  constructor() { }
}
