import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';


/**
 *
 * Service for handling data related to user registration, login, account management, and logout.
 */
@Injectable({
  providedIn: 'root'
})
export class DataService {
  private registerURL = "http://localhost:3000/register"; //Registrar la cuenta (activo en register)
  //private loginURL = "http://localhost:3000/login"; //Login a la cuenta (activo en login)
  private deleteAccountURL = "http://localhost:3000/delete-account";// Eliminación de la cuenta (activo en el hotel-booking)
  private userDetailsURL = "http://localhost:3000/user-details"; //Ver mis datos (activo en hotel-booking)
  private updateUserURL = "http://localhost:3000/update-user"; //Editar mis datos (activo en modal "VER MIS DATOS")
  private logoutURL = "http://localhost:3000/logout"; // Cerrar sesión (activo en logout)
  private reservationURL = "http://localhost:3000/reservations";

  constructor(private http: HttpClient, private authService: AuthService) { }

  /**
   * Registra un nuevo usuario en la cuenta.
   * @param data - The user data to be registered.
   * @returns An observable that emits the response from the server.
   */
  register(data: any): Observable<any> {
    return this.http.post(this.registerURL, data);
  }

  /**
   * Logs in a user.
   * @param data - The user login credentials.
   * @returns An observable that emits the response from the server.
   */
  /*
  login(data: any): Observable<any> {
    return this.http.post(this.loginURL, data);
  }
    */

  deleteAccount(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.delete(this.deleteAccountURL, { headers });
  }

  getUserDetails(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get(this.userDetailsURL, { headers });
  }

  /**
   * Updates the details of a user.
   * @param data - The updated user data.
   * @returns An observable that emits the response from the server.
   */
  updateUser(data: any): Observable<any> {
    return this.http.put(this.updateUserURL, data);
  }

  createReservation(reservationData: any): Observable<any> {
    return this.http.post(this.reservationURL, reservationData);
  }
}


