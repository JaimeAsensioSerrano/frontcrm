import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// --- IMPORTS DE ANGULAR MATERIAL ---
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

// Asegúrate de que la ruta sea correcta (VS Code te ayuda si borras y reescribes la ruta)
import { PostCarComponent } from './components/admin-dashboard/post-car/post-car.component';
import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  declarations: [
    PostCarComponent // <--- 1. ¡IMPORTANTE! Aquí declaramos tu componente
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule, // <--- 2. Necesario para que funcione [formGroup]

    // --- 3. Aquí activamos los módulos de Material que importaste arriba ---
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class AdminModule { }