import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Product } from "../models/product.model";
import { environment } from "src/environments/environment";

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  private apiUrl = environment.apiUrl;

  products?: Product[] = [];

  post(produto: Product): Observable<Product> {
    const endpoint = `${this.apiUrl}/products`;
    return this.http.post<Product>(endpoint, produto);
  }

  put(produto: Product): Observable<Product> {
    const endpoint = `${this.apiUrl}/products`;
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

    return this.http.get<Product[]>(`${this.apiUrl}/products`, {
      params,
    });
  }

  getById(id: any): Observable<Product> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.get<Product>(url);
  }

  remove(id: any): Observable<Product> {
    const url = `${this.apiUrl}/products/${id}`;
    return this.http.delete<Product>(url);
  }
}
