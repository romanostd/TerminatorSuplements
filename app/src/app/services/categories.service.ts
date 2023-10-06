import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Categories } from "../models/categories.model";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  put(categories: Categories): Observable<Categories> {
    const url = "http://localhost:3000/categories";
    return this.http.put<Categories>(url, categories);
  }

  post(categories: Categories): Observable<Categories> {
    const url = "http://localhost:3000/categories";
    return this.http.post<Categories>(url, categories);
  }

  get(): Observable<Categories[]> {
    const url = "http://localhost:3000/categories";
    return this.http.get<Categories[]>(url);
  }

  remove(category_id: any): Observable<Categories> {
    const url = `http://localhost:3000/categories/${category_id}`;
    return this.http.delete<Categories>(url);
  }

  getById(id: any): Observable<Categories> {
    const url = `http://localhost:3000/Categories/${id}`;
    return this.http.get<Categories>(url);
  }
}
