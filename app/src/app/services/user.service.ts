import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {
    this.http = http;
  }

  async post(user: User) {
    const endpoint = "http://localhost:3000/users";
    return await this.http.post<User>(endpoint, user).toPromise();
  }

  async put(user: User) {
    const endpoint = `http://localhost:3000/users`;
    return await this.http.put<User>(endpoint, user).toPromise();
  }

  get(): Observable<User[]> {
    const result = `http://localhost:3000/users`;
    return this.http.get<User[]>(result);
  }

  getById(id: any): Observable<User> {
    const url = `http://localhost:3000/users/${id}`;
    return this.http.get<User>(url);
  }

  remove(user_id: any): Observable<User> {
    const url = `http://localhost:3000/users/${user_id}`;
    return this.http.delete<User>(url);
  }
}
