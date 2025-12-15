import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";
@Injectable({
  providedIn: 'root'
})
export class AlmacenamientoService {

  constructor() { }

  static saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN);
  }
  static getUser(): any {
    // 1. Primero intentamos obtener el dato
    const user = window.localStorage.getItem(USER);

    // 2. Comprobamos si existe (si no es null)
    if (user) {
      // 3. Solo si existe, lo convertimos
      return JSON.parse(user);
    }

    // 4. Si no existe, devolvemos null tranquilamente
    return null;
  }
  static getUserRole(): string {
    const user = this.getUser();
    if (user == null) return "";
    return user.role;
  }
  // En tu archivo almacenamiento.service.ts

  // Añade ": boolean" después del nombre de la función
  static isAdminLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == 'ADMIN';
  }

  // Añade ": boolean" aquí también
  static isCustomerLoggedIn(): boolean {
    if (this.getToken() == null) return false;
    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }


  static logout(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);

  }



}
