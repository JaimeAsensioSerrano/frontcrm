import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-post-car',
  standalone: false, // <--- ESTO ES LA CLAVE. Al ponerlo false, funcionará con tu AdminModule
  templateUrl: './post-car.component.html',
  styleUrl: './post-car.component.css'
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

  constructor(private fb: FormBuilder) { }

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
    // Aquí pondremos la lógica para enviar al servidor más adelante
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