import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  private apiUrl = environment.apiUrl;

  post(user: User): Observable<User> {
    const url = `${this.apiUrl}/users`;
    return this.http.post<User>(url, user);
  }

  put(user: User): Observable<User> {
    const url = `${this.apiUrl}/users`;
    return this.http.put<User>(url, user);
  }

  get(): Observable<User[]> {
    const result = `${this.apiUrl}/users`;
    return this.http.get<User[]>(result);
  }

  getById(id: any): Observable<User> {
    const url = `${this.apiUrl}/users/${id}`;
    return this.http.get<User>(url);
  }

  remove(user_id: any): Observable<User> {
    const url = `${this.apiUrl}/users/${user_id}`;
    return this.http.delete<User>(url);
  }
}
