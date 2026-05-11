import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AlmacenamientoService } from '../../../auth/componets/services/almacenamiento/almacenamiento.service';




@Injectable({
  providedIn: 'root'
})

export class ClienteService {

  private basicUrl = "http://localhost:8080";

  constructor(private http: HttpClient) { }

  getAllCars(): Observable<any> {
    return this.http.get(this.basicUrl + "/api/customer/cars", {
      headers: this.createAuthorizationHeader()
    });
  }

  getCarById(carId: number): Observable<any> {
    return this.http.get(this.basicUrl + "/api/customer/car/" + carId, {
      headers: this.createAuthorizationHeader()
    });
  }

  bookACar(bookACarDto: any): Observable<any> {
    return this.http.post(this.basicUrl + "/api/customer/car/book", bookACarDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  getBookingsByUserId(): Observable<any> {
    return this.http.get(this.basicUrl + "/api/customer/car/bookings/" + AlmacenamientoService.getUserId(), {
      headers: this.createAuthorizationHeader()
    });
  }

  searchCar(searchCarDto: any): Observable<any> {
    return this.http.post(this.basicUrl + "/api/customer/car/search", searchCarDto, {
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
