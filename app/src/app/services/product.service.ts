import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  products?: Product[] = [];

  post(produto: Product): Observable<Product> {
    const endpoint = "http://localhost:3000/products";
    return this.http.post<Product>(endpoint, produto);
  }

  put(produto: Product): Observable<Product> {
    const endpoint = `http://localhost:3000/products`;
    return this.http.put<Product>(endpoint, produto);
  }

  get(filters?: {
    name?: string;
    category_id?: string;
  }): Observable<Product[]> {
    let params = new HttpParams();
    if (filters) {
      if (filters.name) {
        params = params.set("name", filters.name);
      }
      if (filters.category_id) {
        params = params.set("category_id", filters.category_id);
      }
    }

    return this.http.get<Product[]>("http://localhost:3000/products", {
      params,
    });
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
