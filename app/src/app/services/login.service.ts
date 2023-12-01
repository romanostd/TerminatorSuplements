import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  private apiUrl = environment.apiUrl;

  user?: any;

  isLoggedIn(): boolean {
    return this.user != undefined;
  }

  login(email: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http
      .post<any>(url, { email: email, password: password })
      .pipe(tap(user => (this.user = user)));
  }

  logout() {
    this.user = undefined;
  }

  getToken(): any {
    const headers = new HttpHeaders();
    if (this.isLoggedIn()) {
      headers.set("Authorization", `bearer ${this.user?.token}`);
    }
    return this.user;
  }
}
