import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteDashboardComponent } from './components/cliente-dashboard/cliente-dashboard.component';

const routes: Routes = [
  { path: "dashboard", component: ClienteDashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientenRoutingModule { }
