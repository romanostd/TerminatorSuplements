import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private url = ""

  constructor(private http: HttpClient) { }

  login(): Observable<any> {
    const url = `http://localhost:3000/email`
    return this.http.get<any>(url)
  }
}
