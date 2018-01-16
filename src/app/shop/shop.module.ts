import { NgModule } from '@angular/core';

import { ShopRoutingModule } from './shop-routing.module';
import { HomeComponent } from './home/home.component';
import { ShopComponent } from './shop.component';
import { ProductsComponent } from './products/products.component';
import { HeaderComponent } from './header/header.component';
import { CommonModule } from '@angular/common';
import { HomeService } from "./home/home.service";
import { HttpClientModule } from "@angular/common/http";
import { HttpModule } from "@angular/http";
import { ApiService } from "../shared/services/api.service";
import { ProductDetailComponent } from './products/product-detail/product-detail.component';

@NgModule({
  declarations: [
    HomeComponent,
    ShopComponent,
    ProductsComponent,
    HeaderComponent,
    ProductDetailComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    HttpModule
  ],
  providers: [HomeService, ApiService],
})
export class ShopModule { }
