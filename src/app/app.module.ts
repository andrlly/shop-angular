import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { AdminModule } from './admin/admin.module';
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { ApiService } from "./shared/services/api.service";
import { AuthGuard } from "./admin/auth/auth.guard";
import { ProductsService } from "./shared/services/products.service";
import { CategoriesService } from "./shared/services/categories.service";
import { OrderProductsService } from "./shared/services/order-products.service";
import { OrderUsersService } from "./shared/services/order-users.service";


const routes: Routes = [
    {path: '**', pathMatch: 'full', component: NotFoundComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ShopModule,
        AdminModule,
        RouterModule.forRoot(routes),
    ],
    providers: [ApiService, AuthGuard, ProductsService, CategoriesService, OrderProductsService, OrderUsersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
