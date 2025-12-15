import { Component } from '@angular/core';
// CORRECCIÓN 1: Faltaban 'Router' y 'NavigationEnd' en esta importación
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
// Asegúrate de que esta ruta sea correcta según tu estructura de carpetas
import { AlmacenamientoService } from './auth/componets/services/almacenamiento/almacenamiento.service';

@Component({
  selector: 'app-root',
  standalone: true,
  // Asegúrate de añadir los módulos aquí si es standalone
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' // Ojo: en tu captura pone .css, pero a veces es .scss
})
export class AppComponent {
  title = 'crmrentacochesAngular';

  // Inicializamos las variables directamente llamando al servicio
  isCustomerLoggedIn: boolean = AlmacenamientoService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = AlmacenamientoService.isAdminLoggedIn();

  // CORRECCIÓN 2: 'Router' ahora funciona porque lo hemos importado arriba
  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      // CORRECCIÓN 3: Esta es la forma correcta de verificar la navegación en Angular moderno.
      // Usar "event.constructor.name" suele dar fallos.
      if (event instanceof NavigationEnd) {
        this.isAdminLoggedIn = AlmacenamientoService.isAdminLoggedIn();
        this.isCustomerLoggedIn = AlmacenamientoService.isCustomerLoggedIn();
      }
    });
  }

  logout() {
    AlmacenamientoService.logout();
    this.router.navigateByUrl("/login");
  }
}