import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminHeaderComponent } from './admin-header/admin-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OrdersComponent } from './orders/orders.component';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { AuthComponent } from "./auth/auth.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ProductsComponent } from './products/products.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AddProductComponent } from './products/add-product/add-product.component';
import { AuthService } from "./auth/auth.service";
import { CategoriesComponent } from './categories/categories.component';
import { CategoryEditorComponent } from './categories/category-editor/category-editor.component';

@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AdminHeaderComponent,
    DashboardComponent,
    OrdersComponent,
    AdminComponent,
    AuthComponent,
    ProductsComponent,
    ProductDetailComponent,
    AddProductComponent,
    CategoriesComponent,
    CategoryEditorComponent
  ],
  providers: [
    AuthService
  ]
})
export class AdminModule { }
