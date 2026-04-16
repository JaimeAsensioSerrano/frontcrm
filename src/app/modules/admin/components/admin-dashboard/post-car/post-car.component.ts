import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminService } from '../../../service/admin.service';

@Component({
  selector: 'app-post-car',
  templateUrl: './post-car.component.html',
  styleUrls: ['./post-car.component.css']
})
export class PostCarComponent {

  postCarForm!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  listOfBrands = ["BMW", "Audi", "Ferrari", "Tesla", "Volvo", "Toyota", "Honda", "Ford", "Nissan", "Lexus","mercedes","Mercedes-maybach","porsche","Lamborghini","Maserati","Jaguar","land rover","alfa romeo","infiniti","acura","cadillac",];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];


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

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }


    Object.keys(this.postCarForm.controls).forEach(key => {
      let value = this.postCarForm.get(key)!.value;

      if (key === 'year' && value) {
        const date = new Date(value);
        value = date.getFullYear().toString();
      }

      formData.append(key, value);
    });

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
    if (file) {
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