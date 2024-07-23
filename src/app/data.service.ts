import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 *
 * Service for handling data related to user registration, login, account management, and logout.
 */
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
  login(data: any): Observable<any> {
    return this.http.post(this.loginURL, data);
  }

  /**
   * Deletes a user account.
   * @param email - The email of the account to be deleted.
   * @returns An observable that emits the response from the server.
   */
  deleteAccount(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.delete(this.deleteAccountURL, { params });
  }

  /**
   * Retrieves the details of a user.
   * @param email - The email of the user.
   * @returns An observable that emits the response from the server.
   */
  getUserDetails(email: string): Observable<any> {
    const params = new HttpParams().set('email', email);
    return this.http.get(this.userDetailsURL, { params });
  }

  /**
   * Updates the details of a user.
   * @param data - The updated user data.
   * @returns An observable that emits the response from the server.
   */
  updateUser(data: any): Observable<any> {
    return this.http.put(this.updateUserURL, data);
  }

  /**
   * Logs out the current user.
   * @returns An observable that emits the response from the server.
   */
  logout(): Observable<any> {
    return this.http.post(this.logoutURL, {});
  }
}


