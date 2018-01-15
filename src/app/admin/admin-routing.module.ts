import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthComponent } from "./auth/auth.component";
import { AuthGuard } from "../shared/services/auth.guard";

const routes: Routes = [
  { path: 'admin', pathMatch: 'full', redirectTo: 'admin/dashboard' },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
    { path: 'dashboard', component: DashboardComponent },
    { path: 'orders', component: OrdersComponent },
  ]},
  { path: 'login', component: AuthComponent },
  { path: 'registration', component: AuthComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class AdminRoutingModule {}