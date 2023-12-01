import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class EmailService {
  constructor(private http: HttpClient) {}

  private apiUrl = environment.apiUrl;

  reset(email: string, code: string): Observable<any> {
    const url = `${this.apiUrl}/email?email=${email}&code=${code}`;
    return this.http.get<any>(url);
  }
}
