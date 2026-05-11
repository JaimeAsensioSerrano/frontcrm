import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';
import { BookCarComponent } from './components/book-car/book-car.component';
import { MyBookingsComponent } from '../admin/components/my-bookings/my-bookings.component';
import { SearchCarComponent } from './search-car/search-car.component';

const routes: Routes = [
  { path: "dashboard", component: ClienteDashboardComponent },
  { path: "book/:id", component: BookCarComponent },
  { path: "my_bookings", component: MyBookingsComponent },
  { path: "car/search", component: SearchCarComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientenRoutingModule { }
