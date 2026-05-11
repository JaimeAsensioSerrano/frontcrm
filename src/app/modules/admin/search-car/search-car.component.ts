import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms'; // <-- MUY IMPORTANTE para validateForm
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AdminService } from '../service/admin.service';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-search-car',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatCardModule,
    MatDividerModule
  ],
  templateUrl: './search-car.component.html',
  styleUrl: './search-car.component.css'
})
export class SearchCarComponent {

  searchCarForm!: FormGroup;

  listOfBrands = ["BMW", "Audi", "Ferrari", "Tesla", "Volvo", "Toyota", "Honda", "Ford", "Nissan", "Lexus", "mercedes", "Mercedes-maybach", "porsche", "Lamborghini", "Maserati", "Jaguar", "land rover", "alfa romeo", "infiniti", "acura", "cadillac",];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic",];
  isSpinning: boolean = false;
  cars: any = [];

  constructor(private fb: FormBuilder,
    private adminService: AdminService
  ) {
    this.searchCarForm = this.fb.group({
      brand: [null],
      type: [null],
      transmission: [null],
      color: [null],

    })
  }

  searchCar() {
    this.cars = [];

    this.isSpinning = true;
    console.log("Datos de búsqueda:", this.searchCarForm.value);

    this.adminService.searchCar(this.searchCarForm.value).subscribe((res) => {
      res.carDtoList.forEach((element: any) => {
        element.processedImg = "data:image/jpeg;base64," + element.returnedImage;
        this.cars.push(element);
      });
      this.isSpinning = false;
    });
  }
}
