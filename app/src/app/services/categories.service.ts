import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Categories } from "../models/categories.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  serviceCategoryList: any[] = [];
  categoryId: any = undefined;
  private apiUrl = environment.apiUrl;

  put(categories: Categories): Observable<Categories> {
    const url = `${this.apiUrl}/categories`;
    return this.http.put<Categories>(url, categories);
  }

  post(categories: Categories): Observable<Categories> {
    const url = `${this.apiUrl}/categories`;
    return this.http.post<Categories>(url, categories);
  }

  get(): Observable<Categories[]> {
    const url = `${this.apiUrl}/categories`;
    return this.http.get<Categories[]>(url);
  }

  remove(category_id: any): Observable<Categories> {
    const url = `${this.apiUrl}/categories/${category_id}`;
    return this.http.delete<Categories>(url);
  }

  getById(id: any): Observable<Categories> {
    const url = `${this.apiUrl}/Categories/${id}`;
    return this.http.get<Categories>(url);
  }
}
