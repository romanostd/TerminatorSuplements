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

  login(obj : any): Observable<any> {
    const url = `https://rapidprod-sendgrid-v1.p.rapidapi.com/mail/send`
    return this.http.post<any>(url,{obj})
  }
}
