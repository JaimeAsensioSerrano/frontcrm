import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
// IMPORTANTE: Añadimos 'Router' aquí para poder navegar desde el código
import { Router, RouterLink } from '@angular/router';

// Material Imports
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar'; // Importamos el Módulo y el Servicio
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterLink, // Necesario para el HTML
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  hidePassword = true;        
  hideConfirmPassword = true; 
  isSpinning = false;        

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,       // <--- CORREGIDO: Usamos 'Router' para navegar
    private snackBar: MatSnackBar // <--- CORREGIDO: Usamos 'MatSnackBar' para notificaciones
  ) {
    this.signupForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required, 
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
      ]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator }); 
  }

  // Validador para comprobar que las contraseñas coinciden
  passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;
    
    if (password !== confirmPassword && confirmPassword) {
      control.get('confirmPassword')?.setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    } else {
      return null;
    }
  }

  register() {
    console.log(this.signupForm.value);

    // Si el formulario es inválido, mostramos error y paramos
    if (this.signupForm.invalid) {
      this.snackBar.open("Por favor, rellena todos los campos correctamente", "Cerrar", { duration: 3000 });
      return; 
    }

    this.isSpinning = true; 

    this.authService.register(this.signupForm.value).subscribe((res) => {
      console.log(res);
      this.isSpinning = false;

      if (res.id != null) {
        // ÉXITO
        this.snackBar.open("¡Registro exitoso!", "Cerrar", { duration: 5000 });
        this.router.navigateByUrl('/login'); // <--- AHORA SÍ FUNCIONA
      } else {
        // ERROR CONTROLADO
        this.snackBar.open("Algo salió mal en el registro", "Cerrar", { duration: 5000 });
      }

    }, (error) => {
      // ERROR DE SERVIDOR
      this.isSpinning = false;
      this.snackBar.open("Error al registrarse. Inténtalo de nuevo.", "Cerrar", { duration: 5000 });
    });
  }
}