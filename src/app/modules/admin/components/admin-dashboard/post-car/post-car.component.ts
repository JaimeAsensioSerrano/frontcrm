import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importar Router
import { MatSnackBar } from '@angular/material/snack-bar'; // Importar SnackBar de Angular Material
import { AdminService } from '../../../service/admin.service'; // Ruta corregida (3 niveles atrás)

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css'] // Asegúrate que coincida con tu archivo (.css o .scss)
})
export class PostCarComponent {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  listOfBrands = ["BMW", "Audi", "Ferrari", "Tesla", "Volvo", "Toyota", "Honda", "Ford", "Nissan", "Hyundai", "Lexus", "Kia"];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

  // Constructor con todas las inyecciones necesarias
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit() {
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
    this.isSpinning = true;

    const formData: FormData = new FormData();

    // Solo añadimos la imagen si existe para evitar errores
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Añade el resto de campos del formulario
    Object.keys(this.postCarForm.controls).forEach(key => {
      let value = this.postCarForm.get(key)!.value;

      // --- CORRECCIÓN ESPECIAL PARA LA FECHA ---
      // Si el campo es 'year', lo convertimos para que no de error 400
      if (key === 'year' && value) {
         const date = new Date(value);
         // Opción A: Si tu backend espera solo el AÑO (ej: 2017) usa esto:
         value = date.getFullYear().toString(); 
         
         // Opción B: Si tu backend espera FECHA COMPLETA (ej: 2017-05-20) usa esto:
         // value = date.toISOString().split('T')[0]; 
      }
      // ----------------------------------------

      formData.append(key, value);
    });

    // Llamada al servicio
    this.adminService.addCar(formData).subscribe((res) => {
      this.isSpinning = false;
      this.snackBar.open("Car posted successfully", "Close", { duration: 5000 });
      this.router.navigateByUrl('/admin/dashboard');
      console.log(res);
    }, error => {
      this.isSpinning = false;
      this.snackBar.open("Error posting car", "Close", { duration: 5000 });
      console.log(error);
    });
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) { // Verificamos que el archivo existe
      this.selectedFile = file;
      this.previewImage();
    }
  }

  previewImage() {
    if (!this.selectedFile) return;
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }
}