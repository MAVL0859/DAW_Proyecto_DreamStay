import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private apiUrl = 'http://localhost:3000/hotels';

  constructor(private http: HttpClient) { }
  getHotels(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addHotel(hotelData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, hotelData);
  }

  updateHotel(id: number, hotelData: FormData): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, hotelData);
  }

  deleteHotel(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

  getHotelById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
