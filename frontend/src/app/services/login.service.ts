import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';
import { Product } from '../models/product.model';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) {
    this.http = http;
  }

  user?: any

  // async login(email: string, password: string) {
  //   const endpoint = 'http://localhost:3000/login'
  //   return await this.http.post<any>(endpoint, { email, password} ).toPromise()
  // }

  isLoggedIn(): boolean {
    return this.user != undefined
  }

  login(email: string, password: string): Observable<any> {
    const url = 'http://localhost:3000/login'
    return this.http.post<any>(url, { email: email, password: password }).pipe(tap(user => this.user = user)
    )
  }

  logout() {
    this.user = undefined
  }

  getToken(): any {
    let headers = new HttpHeaders
    if (this.isLoggedIn()) {
      headers = headers.set('Authorization', `bearer ${this.user?.token}`)
    }
    return this.user
  }

}
