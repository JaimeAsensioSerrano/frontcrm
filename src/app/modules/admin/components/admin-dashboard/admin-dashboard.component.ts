import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common'; // <-- Necesario para *ngFor y date pipe
import { MatCardModule } from '@angular/material/card'; // <-- Tarjetas de Material
import { MatDividerModule } from '@angular/material/divider';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule, MatSnackBarModule, RouterModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.cars = [];
    this.adminService.getAllCars().subscribe((res: any) => {
      console.log(res);
      res.forEach((element: any) => {
        element.processedImg = "data:image/jpeg;base64," + element.returnedImage;
        this.cars.push(element);
      });
    });
  }

  deleteCar(id: number) {
  this.adminService.deleteCar(id).subscribe((res) => {
    this.snackBar.open('Coche eliminado correctamente', 'Cerrar', { duration: 5000 });
    this.getAllCars(); 
  });
}
}
