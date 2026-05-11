import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basicUrl = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  addCar(carDto: any): Observable<any> {
    return this.http.post(this.basicUrl + "/car", carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getAllCars(): Observable<any> {
    return this.http.get(this.basicUrl + "/cars", {
      headers: this.createAuthorizationHeader()
    });
  }


  deleteCar(id: number): Observable<any> {
    return this.http.delete(this.basicUrl + "/car/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(id: number): Observable<any> {
    return this.http.get(this.basicUrl + "/car/" + id, {
      headers: this.createAuthorizationHeader()
    });
  }
  updateCar(carId: number, carDto: any): Observable<any> {
    return this.http.put(this.basicUrl + "/car/" + carId, carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarBookings(): Observable<any> {
    return this.http.get(this.basicUrl + "/car/bookings", {
      headers: this.createAuthorizationHeader()
    });
  }

  changeBookingStatus(bookingId: number, status: string): Observable<any> {
    return this.http.get(this.basicUrl + `/car/booking/${bookingId}/${status}`, {
      headers: this.createAuthorizationHeader()
    });
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(this.basicUrl + "/car/search", searchCarDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');

    return authHeaders.set(
      'Authorization',
      'Bearer ' + token
    );
  }
}