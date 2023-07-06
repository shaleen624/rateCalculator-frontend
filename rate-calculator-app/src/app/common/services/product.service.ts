import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:3000/products';

  constructor(private http: HttpClient) { }

  getProducts(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}`);
  }

  addProduct(product: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}`, product);
  }

  editProduct( product: any): Observable<any> {
    return this.http.put<any>(`${this.baseUrl}/${product.id}`, product);
  }

  deleteProduct(productId: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${productId}`);
  }
}
