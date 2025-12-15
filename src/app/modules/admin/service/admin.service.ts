import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
// Si tienes un StorageService para el token, impórtalo. 
// Si no, usaremos localStorage directamente como en el ejemplo.

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private basicUrl = "http://localhost:8080/api/admin";

  constructor(private http: HttpClient) { }

  // 1. Método para añadir coche (AHORA CON TOKEN)
  addCar(carDto: any): Observable<any> {
    return this.http.post(this.basicUrl + "/car", carDto, {
      headers: this.createAuthorizationHeader() // <--- ¡AQUÍ ESTÁ LA CLAVE!
    });
  }

  // 2. Método para obtener todos los coches (TAMBIÉN CON TOKEN)
  getAllCars(): Observable<any> {
    return this.http.get(this.basicUrl + "/cars", {
      headers: this.createAuthorizationHeader()
    });
  }

  // --- Función auxiliar para crear la cabecera con el Token ---
  createAuthorizationHeader(): HttpHeaders {
    let authHeaders: HttpHeaders = new HttpHeaders();

    // IMPORTANTE: Aquí asumo que guardaste el token como 'token' o 'userId' en el localStorage al hacer login.
    // Si usas un servicio 'StorageService.getToken()', úsalo aquí.
    const token = localStorage.getItem('token');

    return authHeaders.set(
      'Authorization',
      'Bearer ' + token
    );
  }
}