import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private registerURL = "http://localhost:3000/register"; //Registrar la cuenta (activo en register)
  private loginURL = "http://localhost:3000/login"; //Login a la cuenta (activo en login)
  private deleteAccountURL = "http://localhost:3000/delete-account";// Eliminación de la cuenta (activo en el hotel-booking)
  private userDetailsURL = "http://localhost:3000/user-details"; //Ver mis datos (activo en hotel-booking)
  private updateUserURL = "http://localhost:3000/update-user"; //Editar mis datos (activo en modal "VER MIS DATOS")
  private logoutURL = "http://localhost:3000/logout"; // Cerrar sesión (activo en logout)

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

  getUserDetails(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(this.userDetailsURL, { params });
  }

  updateUser(data: any): Observable<any> {
    return this.http.put(this.updateUserURL, data);
  }

  logout(): Observable<any> {
    return this.http.post(this.logoutURL, {});
  }
}


/*getUser(email: string): Observable<any> {
    return this.http.get(`${this.userURL}/${email}`);
  }*/
  //private userURL = "http://localhost:3000/user";// Ver la cuenta (activo en el hotel-booking)
   //Editar la cuenta (activo dentro de "VER LA CUENTA")
