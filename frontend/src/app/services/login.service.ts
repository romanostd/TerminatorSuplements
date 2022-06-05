import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { User } from '../models/user.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(
    private http: HttpClient,
  ) {
    this.http = http;   
  }

  user?: User

  // async login(email: string, password: string) {
  //   const endpoint = 'http://localhost:3000/login'
  //   return await this.http.post<any>(endpoint, { email, password} ).toPromise()
  // }

  isLoggedIn(): boolean {
    return this.user != undefined
  }

  login(email: string, password: string): Observable<User> {
    const url = 'http://localhost:3000/login'
    return this.http.post<User>(url, {email: email, password: password}).pipe(tap(user => this.user = user)
  )}

}
