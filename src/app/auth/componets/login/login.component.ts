import { Component } from '@angular/core';
// ⬇️ ESTAS SON LAS LÍNEAS QUE TE FALTABAN
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service'; // Asegúrate que la ruta sea correcta
import { MatSnackBar } from '@angular/material/snack-bar'; // Para mostrar mensajes de error/éxito
import { CommonModule } from '@angular/common'; // Importante para que funcione *ngIf

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    RouterLink
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
    private snackBar: MatSnackBar
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  login() {
    if (this.loginForm.invalid) {
      this.snackBar.open("Please fill in all fields correctly", "Close", { duration: 3000 });
      return;
    }

    this.isSpinning = true;
    
    this.authService.register(this.loginForm.value).subscribe((res: any) => { // Nota: en tu servicio se llama 'register' pero aquí hacemos login
        this.isSpinning = false;
        console.log(res);
        // Aquí deberías comprobar si el login fue exitoso según tu backend
        if (res.id != null) {
            this.snackBar.open("Login Successful!", "Close", { duration: 5000 });
            this.router.navigateByUrl('/dashboard'); // O a donde quieras ir
        } else {
            this.snackBar.open("Bad credentials", "Close", { duration: 5000, panelClass: 'error-snackbar' });
        }
    }, (error) => {
        this.isSpinning = false;
        this.snackBar.open("Network Error", "Close", { duration: 5000, panelClass: 'error-snackbar' });
    });
  }
}