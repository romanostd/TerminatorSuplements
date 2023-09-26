import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  constructor(private http: HttpClient) {}

  reset(email: string, code: string): Observable<any> {
    const url = `http://localhost:3000/email?email=${email}&code=${code}`;
    return this.http.get<any>(url);
  }
}
