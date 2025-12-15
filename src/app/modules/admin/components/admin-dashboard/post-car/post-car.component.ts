import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// 👇 ESTA ES LA RUTA EXACTA BASADA EN TUS CAPTURAS (3 niveles atrás)
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-post-car',
  standalone: false,
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent implements OnInit {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  listOfBrands = ["BMW", "Audi", "Ferrari", "Tesla", "Volvo", "Toyota", "Honda", "Ford", "Nissan", "Hyundai", "Lexus", "Kia"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  constructor(
    private fb: FormBuilder,
    private service: AdminService, // ✅ Aquí inyectamos el servicio
    private router: Router
  ) { }

  ngOnInit(): void {
    this.postCarForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],
    });
  }

  postCar() {
    console.log(this.postCarForm.value);

    if (this.postCarForm.invalid) {
      alert("Por favor rellena todos los campos requeridos.");
      return;
    }

    this.isSpinning = true;
    const formData = new FormData();

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    formData.append('brand', this.postCarForm.get('brand')!.value);
    formData.append('name', this.postCarForm.get('name')!.value);
    formData.append('type', this.postCarForm.get('type')!.value);
    formData.append('color', this.postCarForm.get('color')!.value);
    formData.append('year', this.postCarForm.get('year')!.value);
    formData.append('transmission', this.postCarForm.get('transmission')!.value);
    formData.append('description', this.postCarForm.get('description')!.value);
    formData.append('price', this.postCarForm.get('price')!.value);

    // ✅ Llamamos a addCar (nombre correcto según tu servicio)
    this.service.addCar(formData).subscribe({
      next: (res) => {
        this.isSpinning = false;
        console.log("✅ Coche guardado con éxito:", res);

        // Imprimimos los coches para verificar
        this.imprimirTodosLosCoches();
      },
      error: (err) => {
        this.isSpinning = false;
        console.error("❌ Error al guardar el coche:", err);
      }
    });
  }

  imprimirTodosLosCoches() {
    this.service.getAllCars().subscribe({
      next: (res) => {
        console.log("📋 LISTA ACTUALIZADA:");
        console.table(res);
      },
      error: (err) => {
        console.log("Error al recuperar la lista:", err);
      }
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile as Blob);
  }
}