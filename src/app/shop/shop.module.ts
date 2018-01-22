import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from "@angular/http";

import { ShopRoutingModule } from './shop-routing.module';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { HomeService } from "../shared/services/home.service";
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { CartComponent } from './cart/cart.component';
import { StorageService } from "../shared/services/storage.service";

@NgModule({
  declarations: [
    HomeComponent,
    ShopComponent,
    ProductsComponent,
    HeaderComponent,
    ProductDetailComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpModule
  ],
  providers: [HomeService, StorageService],
})
export class ShopModule { }
