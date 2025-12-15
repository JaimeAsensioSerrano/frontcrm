import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // ⚠️ IMPORTANTE: Comprueba que esta URL sea la correcta de tu Backend (Spring Boot)
  private basicUrl = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  // 1. Método para añadir coche (El que te faltaba o se llamaba diferente)
  addCar(carDto: any): Observable<any> {
    // Fíjate que la ruta sea la correcta (ej: /car o /post-car según tu backend)
    return this.http.post(this.basicUrl + "/car", carDto);
  }

  // 2. Método para obtener todos los coches (El que te faltaba para el console.table)
  getAllCars(): Observable<any> {
    return this.http.get(this.basicUrl + "/cars");
  }

  // Si tienes otros métodos aquí abajo, déjalos...
}