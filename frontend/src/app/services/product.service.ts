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

  // async get() {
  //   const endpoint = 'http://localhost:3000/products'
  //   return await this.http.get<Product[]>(endpoint).toPromise()
      
  // }

  async post(produto: Product) {
    const endpoint = 'http://localhost:3000/products'
    return await this.http.post<Product>(endpoint, produto).toPromise()
}

// async register(produto: Product) {
//   const endpoint = `https://petstore.swagger.io/v2/user`;
//   const message = await this.http.post<Product>(endpoint, produto).toPromise();
  
//   return produto;
// }

  async get(){
    const result = await this.http.get<Product[]>('http://localhost:3000/products').toPromise();
    return result;
  }


  // get() : Observable<Product[]> {
  //   return this.http.get<Product[]>('http://localhost:3000/products')
  // }

}