import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MatTableModule } from '@angular/material/table'; 
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'; 
import { MatButtonModule } from '@angular/material/button'; 
import { AdminService } from '../../service/admin.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-get-bookings',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatSnackBarModule
  ],
  templateUrl: './get-bookings.component.html',
  styleUrl: './get-bookings.component.css'
})
export class GetBookingsComponent {
  
  bookings: any; 
  isSpinning: boolean = false; 
  displayedColumns: string[] = ['username', 'email', 'carName', 'fromDate', 'toDate', 'days', 'price', 'status', 'action'];

 constructor(
    private adminService: AdminService,
    private snackBar: MatSnackBar 
  ) {
    this.getBookings();
  }

  getBookings() {
    this.isSpinning = true;
    this.adminService.getCarBookings().subscribe((res) => {
      console.log(res);
      this.bookings = res; 
      this.isSpinning = false; 
    });
  }

  changeBookingStatus(bookingId: number, status: string) {
  this.isSpinning = true;
  console.log("ID de reserva:", bookingId, "Nuevo estado:", status);
  
  this.adminService.changeBookingStatus(bookingId, status).subscribe(
    (res) => {
      this.isSpinning = false;
      console.log(res);
      this.getBookings(); 
      
      this.snackBar.open("Estado de reserva actualizado", "Cerrar", { duration: 5000 });
    }, 
    (error) => {
      this.isSpinning = false;
      
      this.snackBar.open("Algo ha ido mal al actualizar", "Cerrar", { duration: 5000 });
    }
  );
}
}