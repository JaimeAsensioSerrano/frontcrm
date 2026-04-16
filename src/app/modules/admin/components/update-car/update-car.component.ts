import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrl: './update-car.component.css'
})
export class UpdateCarComponent {
  isSpinning = false;
  imgChanged: boolean = false;
  selectedFile: any;
  carId: number;
  existingImage: string | null = null;
  updateForm!: FormGroup;
  imagePreview: string | ArrayBuffer | null = null;
  listOfBrands = ["BMW", "Audi", "Ferrari", "Tesla", "Volvo", "Toyota", "Honda", "Ford", "Nissan", "Lexus","mercedes","Mercedes-maybach","porsche","Lamborghini","Maserati","Jaguar","land rover","alfa romeo","infiniti","acura","cadillac",];
  listOfType = ["Petrol", "Hybrid", "Diesel", "Electric", "CNG"];
  listOfColor = ["Red", "White", "Blue", "Black", "Orange", "Grey", "Silver"];
  listOfTransmission = ["Manual", "Automatic"];

 constructor(private adminService: AdminService,
            private activatedRoute: ActivatedRoute,
            private fb: FormBuilder,
            private snackBar: MatSnackBar,
            private router: Router) {
  this.carId = this.activatedRoute.snapshot.params["id"];
}


  ngOnInit() {
    this.updateForm = this.fb.group({
      name: [null, Validators.required],
      brand: [null, Validators.required],
      type: [null, Validators.required],
      color: [null, Validators.required],
      transmission: [null, Validators.required],
      price: [null, Validators.required],
      description: [null, Validators.required],
      year: [null, Validators.required],

    })
    this.getCarById();
  }

  getCarById() {
    this.isSpinning = true;
    this.adminService.getCarById(this.carId).subscribe((res) => {
      // console.log(res);
      this.isSpinning = false;
      const carDto = res;
      this.existingImage = 'data:image/jpeg;base64,' + res.returnedImage;
      console.log(carDto);
      console.log(this.existingImage);
      this.updateForm.patchValue(carDto);
    })
  }

  updateCar() {
    console.log(this.updateForm.value);
    this.isSpinning = true;

    const formData: FormData = new FormData();
    if(this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile);

    }

    Object.keys(this.updateForm.controls).forEach(key => {
      let value = this.updateForm.get(key)!.value;

      if (key === 'year' && value) {
        const date = new Date(value);
        value = date.getFullYear().toString();
      }

      formData.append(key, value);
    });

    this.adminService.updateCar(this.carId, formData).subscribe((res) => {
      this.isSpinning = false;
      this.snackBar.open("Car updated successfully", "Close", { duration: 5000 });
      this.router.navigateByUrl('/admin/dashboard');
      console.log(res);
    }, error => {
      this.isSpinning = false;
      this.snackBar.open("Error updating car", "Close", { duration: 5000 });
      console.log(error);
    });

  }
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
    this.imgChanged = true;
    this.existingImage = null;
    this.previewImage();
  }
  previewImage() {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);

  }
}
