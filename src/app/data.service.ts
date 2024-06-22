import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private registerURL = "http://localhost:3000/register";
  private loginURL = "http://localhost:3000/login";
   private deleteAccountURL = "http://localhost:3000/delete-account";


  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(this.registerURL, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(this.loginURL, data);
  }

  deleteAccount(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.delete(this.deleteAccountURL, { params });
  }
}

