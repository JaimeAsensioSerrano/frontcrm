import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basicUrl = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  // Método para añadir coche (AHORA CON TOKEN)
  addCar(carDto: any): Observable<any> {
    return this.http.post(this.basicUrl + "/car", carDto, {
      headers: this.createAuthorizationHeader()
    });
  }

  // Método para obtener todos los coches (TAMBIÉN CON TOKEN)
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

  // --- Función auxiliar para crear la cabecera con el Token ---
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();
    const token = localStorage.getItem('token');

    return authHeaders.set(
      'Authorization',
      'Bearer ' + token
    );
  }
}