import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { AuthComponent } from "./auth/auth.component";
import { ProductsComponent } from "./products/products.component";
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { CategoriesComponent } from "./categories/categories.component";
import { OrderDetailComponent } from "./orders/order-detail/order-detail.component";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
    {path: 'admin', pathMatch: 'full', redirectTo: 'admin/dashboard'},
    {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard],  children: [
            {path: 'dashboard', component: DashboardComponent},
            {path: 'categories', component: CategoriesComponent},
            {path: 'products', component: ProductsComponent},
            {path: 'products/:id', component: ProductDetailComponent},
            {path: 'orders', component: OrdersComponent},
            {path: 'order/:id', component: OrderDetailComponent},
        ]
    },
    {path: 'login', component: AuthComponent},
    {path: 'registration', component: AuthComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class AdminRoutingModule {
}