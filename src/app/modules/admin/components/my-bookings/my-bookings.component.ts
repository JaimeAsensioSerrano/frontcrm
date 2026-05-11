import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ClienteService } from '../../../clienten/service/cliente.service';

@Component({
  selector: 'app-my-bookings',
  standalone: true,

  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './my-bookings.component.html',
  styleUrl: './my-bookings.component.css'
})
export class MyBookingsComponent {

  bookedCars: any;
  isSpinning: boolean = false;
  displayedColumns: string[] = ['carName', 'fromDate', 'toDate', 'days', 'price', 'status'];

  constructor(private service: ClienteService) {
    this.getMyBookings();
  }

  getMyBookings() {
    this.isSpinning = true;

    this.service.getBookingsByUserId().subscribe({
      next: (res) => {
        console.log(res);
        this.bookedCars = res;
        this.isSpinning = false;
      },
      error: (err) => {
        console.error("Error al obtener reservas", err);
        this.isSpinning = false;
      }
    });
  }
}