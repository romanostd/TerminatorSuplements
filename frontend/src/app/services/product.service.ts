import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  products?: Product[] = []

   post(produto: Product): Observable<Product> {
    const endpoint = 'http://localhost:3000/products';
    return this.http.post<Product>(endpoint, produto);
  }

  put(produto: Product): Observable<Product> {
    const endpoint = `http://localhost:3000/products`;
    return this.http.put<Product>(endpoint, produto);
  }

  get(query?: string): Observable<Product[]> {
    if (query) {
      const result = `http://localhost:3000/products?name=${query}`;
      return this.http.get<Product[]>(result);
    } else {
      const result = `http://localhost:3000/products`;
      return this.http.get<Product[]>(result);
    }
  }

  getById(id: any): Observable<Product> {
    const url = `http://localhost:3000/products/${id}`;
    return this.http.get<Product>(url);
  }

  remove(id: any): Observable<Product> {
    const url = `http://localhost:3000/products/${id}`;
    return this.http.delete<Product>(url);
  }
}
