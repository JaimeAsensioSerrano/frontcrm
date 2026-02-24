import { Component } from '@angular/core';
import { AdminService } from '../../service/admin.service';
import { CommonModule } from '@angular/common'; // <-- Necesario para *ngFor y date pipe
import { MatCardModule } from '@angular/material/card'; // <-- Tarjetas de Material
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatDividerModule],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent {

  cars: any = [];

  constructor(private adminService: AdminService) { }

  ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.adminService.getAllCars().subscribe((res: any) => {
      console.log(res);
      res.forEach((element: any) => {
        element.processedImg = "data:image/jpeg;base64," + element.returnedImage;
        this.cars.push(element);
      });
    });
  }
}
