import { Component } from '@angular/core';
import { ClienteService } from '../../service/cliente.service';
import { MatDivider } from "@angular/material/divider";
import { MatCardContent, MatCard } from "@angular/material/card";
import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';


@Component({
  selector: 'app-cliente-dashboard',
  standalone: true,
  imports: [MatDivider, MatCardContent, MatCard, CommonModule, MatDividerModule],
  templateUrl: './cliente-dashboard.component.html',
  styleUrl: './cliente-dashboard.component.css'
})
export class ClienteDashboardComponent {
deleteCar(arg0: any) {
throw new Error('Method not implemented.');
}

    cars: any = [];

  constructor(private service: ClienteService) { }

    ngOnInit() {
    this.getAllCars();
  }

  getAllCars() {
    this.cars = [];
    this.service.getAllCars().subscribe((res: any) => {
      console.log(res);
      res.forEach((element: any) => {
        element.processedImg = "data:image/jpeg;base64," + element.returnedImage;
        this.cars.push(element);
      });
    });
  }

}
