import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';



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


      createAuthorizationHeader(): HttpHeaders {
        let authHeaders: HttpHeaders = new HttpHeaders();
        const token = localStorage.getItem('token');
    
        return authHeaders.set(
          'Authorization',
          'Bearer ' + token
        );
      }
}
