import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '../core/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(
    private http: HttpClient,
    private api: ApiService
  ) {}

  getProducts() {
    return this.http.get(`${this.api.baseUrl}/products`);
  }

  createProduct(data: any) {
    return this.http.post(`${this.api.baseUrl}/products`, data);
  }

  deleteProduct(id: string) {
    return this.http.delete(`${this.api.baseUrl}/products/${id}`);
  }


  updateProduct(id: string, product: any) {
  return this.http.put(`${this.api.baseUrl}/products/${id}`, product);
}
}
