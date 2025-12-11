import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para el *ngIf
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';

// 1. ZONA DE PEDIDOS (Arriba del todo)
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
// Añadimos MatSnackBarModule aquí también para que no de error de "Provider"
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar'; 

import { AuthService } from '../services/auth/auth.service';
import { AlmacenamientoService } from '../services/almacenamiento/almacenamiento.service';

@Component({
  selector: 'app-login',
  standalone: true,
  // 2. ZONA DE USO (Aquí es donde seguramente te faltaban cosas)
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink,
    MatFormFieldModule,      // <--- IMPORTANTE: Tienen que estar aquí dentro
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule        // <--- Necesario para que funcionen los mensajes
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isSpinning = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar,
    private message: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.snackBar.open("Por favor, rellena todos los campos correctamente", "Cerrar", { duration: 3000 });
      return;
    }

    this.isSpinning = true;

    // 1. Muestra lo que envías (Email y Contraseña)
    console.log("DATOS ENVIADOS:", this.loginForm.value); // <--- NUEVO

    this.authService.login(this.loginForm.value).subscribe((res: any) => {
        this.isSpinning = false;

        // 2. Muestra lo que recibes de Java (Token, ID, Rol)
        console.log("RESPUESTA RECIBIDA:", res); // <--- NUEVO

        if (res.userId != null) {
            const user ={
              id: res.userId,
              role:res.userRole
            }
            AlmacenamientoService.saveToken(res.jwt);
            AlmacenamientoService.saveUser(user);
            if(AlmacenamientoService.isAdminLoggedIn()){
            this.router.navigateByUrl('/admin/dashboard');
            } else if(AlmacenamientoService.isCustomerLoggedIn()){
              this.router.navigateByUrl('/customer/dashboard');
            } else {
             this.snackBar.open("Credenciales incorrectas", "Cerrar", { duration: 5000 });

            }


            this.snackBar.open("¡Login exitoso!", "Cerrar", { duration: 5000 });
            //this.router.navigateByUrl('/dashboard'); 
        } else {
            this.snackBar.open("Credenciales incorrectas", "Cerrar", { duration: 5000, panelClass: 'error-snackbar' });
        
      }
    }, (error) => {
        this.isSpinning = false;
        this.snackBar.open("Error de red o servidor", "Cerrar", { duration: 5000, panelClass: 'error-snackbar' });
    });
  }
}