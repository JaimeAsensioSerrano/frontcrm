import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router, NavigationEnd } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AlmacenamientoService } from './auth/componets/services/almacenamiento/almacenamiento.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatButtonModule, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})
export class AppComponent {
  title = 'crmrentacochesAngular';
  isCustomerLoggedIn: boolean = AlmacenamientoService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = AlmacenamientoService.isAdminLoggedIn();

  constructor(private router: Router) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
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