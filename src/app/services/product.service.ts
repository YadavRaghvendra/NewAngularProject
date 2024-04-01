import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

const baseUrl="https://localhost:7290/api/Product/"
@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http:HttpClient) { }

  getAllProduct(): Observable<Product[]> {
    return this.http.get<Product[]>(baseUrl+'getproductlist');
  }

  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(`${baseUrl}getproductbyid?Id=${id}`);
  }

  createProduct(data: any): Observable<any> {
    return this.http.post(`${baseUrl}addproduct`, data);
  }
  updateProduct(data: Product): Observable<any> {
    return this.http.put(`${baseUrl}updateproduct`, data);
  }

  deleteProduct(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}deleteproduct?Id=${id}`);
  }
  pagination(PageSize: any, PageNumber: any): Observable<any> {
    return this.http.get(`${baseUrl}paginationinfo?PageSize=${PageSize}&PageNumber=${PageNumber}`);
  }
}
