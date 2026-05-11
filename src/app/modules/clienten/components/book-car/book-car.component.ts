import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClienteService } from '../../service/cliente.service';
import { ActivatedRoute } from '@angular/router';
import { MatDivider } from "@angular/material/divider";
import { MatCardContent, MatCard } from "@angular/material/card";
import { RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AlmacenamientoService } from '../../../../auth/componets/services/almacenamiento/almacenamiento.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-car',
  standalone: true,
  imports: [CommonModule, MatDivider, MatCardContent, MatCard, RouterModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule, MatButtonModule, MatProgressSpinnerModule, MatSnackBarModule],
  templateUrl: './book-car.component.html',
  styleUrl: './book-car.component.css'
})
export class BookCarComponent implements OnInit {

  carId: number;
  car: any;
  processedImage: any;
  validateForm!: FormGroup;
  isSpinning: boolean = false;
  dateFormat: string = 'dd/MM/yyyy';

  constructor(
    private service: ClienteService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: ClienteService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.carId = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      toDate: [null, Validators.required],
      fromDate: [null, Validators.required],
    });
    this.getCarById();
  }

  getCarById() {
    this.service.getCarById(this.carId).subscribe((res) => {
      console.log(res);
      this.processedImage = "data:image/jpeg;base64," + res.returnedImage;
      this.car = res;
    });
  }

  bookACar() {
    this.isSpinning = true;
    let formValues = this.validateForm.value;

    // 1. Extraemos las fechas y las convertimos a formato YYYY-MM-DD
    const fDate = new Date(formValues.fromDate);
    const fromDateString = fDate.getFullYear() + '-' +
      ('0' + (fDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + fDate.getDate()).slice(-2);

    const tDate = new Date(formValues.toDate);
    const toDateString = tDate.getFullYear() + '-' +
      ('0' + (tDate.getMonth() + 1)).slice(-2) + '-' +
      ('0' + tDate.getDate()).slice(-2);

    // 2. Metemos las fechas limpias en el DTO
    let bookACarDto = {
      toDate: toDateString,
      fromDate: fromDateString,
      userId: AlmacenamientoService.getUserId(),
      carId: this.carId
    };

    console.log("Datos LIMPIOS que viajan al backend:", bookACarDto);


    console.log("Datos que viajan al backend:", bookACarDto);

    this.service.bookACar(bookACarDto).subscribe(
      (res) => {
        console.log("Respuesta del servidor:", res);
        this.snackBar.open("Coche reservado con éxito", "Cerrar", { duration: 5000 });
        this.router.navigateByUrl("/customer/dashboard");
        this.isSpinning = false;
      },
      (error) => {
        console.error("Fallo al enviar:", error);
        this.snackBar.open("Error al reservar el coche", "Cerrar", { duration: 5000 });
        this.isSpinning = false;
      }
    );
  }
}