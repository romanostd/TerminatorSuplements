import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, Optional } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';


@Injectable()
export class ProductService {

  constructor(
    private http: HttpClient,
  ) {
    this.http = http;
  }

  async post(produto: Product) {
    const endpoint = 'http://localhost:3000/products'
    return await this.http.post<Product>(endpoint, produto).toPromise()
  }

  async get() {


    const result = await this.http.get<Product[]>('http://localhost:3000/products').toPromise();
    return result;
  }

  // async getById(id: number) {
  //   return await this.http.get<Product[]>(`http://localhost:3000/products/${id}`).toPromise();

  // }

  getById(id: number): Observable<Product> {
    const url = `http://localhost:3000/products/${id}`
    return this.http.get<Product>(url)
  }


}



