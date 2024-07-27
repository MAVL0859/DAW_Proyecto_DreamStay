import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000'; // URL del servidor

  constructor(private http: HttpClient) {}

  // Método para crear una reserva
  createReservation(reservationData: any): Observable<any> {
    const token = localStorage.getItem('token'); // Asegúrate de que el token esté disponible
    if (!token) {
      console.error('Token no encontrado en localStorage.');
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.post(`${this.apiUrl}/reservations`, reservationData, { headers });
  }

  // Método para obtener las reservas del usuario
  getUserReservations(): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    });
    return this.http.get(`${this.apiUrl}/reservations`, { headers });
  }
}
