import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Categories } from '../models/categories.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(
    private http: HttpClient,
  ) { }

  async post(categories: Categories) {
    const endpoint = 'http://localhost:3000/categories'
    return await this.http.post<Categories>(endpoint, categories).toPromise()
  }

  async put(categories: Categories, id: any) {
    const endpoint = `http://localhost:3000/categories/${id}`
    return await this.http.put<Categories>(endpoint, categories).toPromise()
  }

  get(): Observable<Categories[]> {
    const url = 'http://localhost:3000/categories'
    return this.http.get<Categories[]>(url)
  }

  remove(id: any): Observable<Categories> {
    const url = `http://localhost:3000/categories/${id}`
    return this.http.delete<Categories>(url)
  }

  getById(id: any): Observable<Categories> {
    const url = `http://localhost:3000/Categories/${id}`
    return this.http.get<Categories>(url)
  }



}
