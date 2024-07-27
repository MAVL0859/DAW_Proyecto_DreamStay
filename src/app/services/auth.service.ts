import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loginURL = 'http://localhost:3000/login';
  private tokenKey = 'authToken';
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  login(credentials: { email: string, password: string }): Observable<any> {
    return this.http.post<any>(this.loginURL, credentials).pipe(
      tap(response => {
        if (response.token) {
          this.setToken(response.token);
        }
      })
    );
  }

  getUserInfo(): any {
    const token = this.getToken();
    if (token) {
      return this.jwtHelper.decodeToken(token);
    }
    return null;
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
}
