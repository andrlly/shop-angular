import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { NgFlashMessagesModule } from "ng-flash-messages";

import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { AdminModule } from './admin/admin.module';
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { ApiService } from "./shared/services/api.service";
import { AuthGuard } from "./admin/auth/auth.guard";
import { ProductsService } from "./shared/services/products.service";
import { CategoriesService } from "./shared/services/categories.service";
import { OrdersService } from "./shared/services/order.service";


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
        HttpClientModule,
        FormsModule,
        ShopModule,
        AdminModule,
        NgFlashMessagesModule,
        RouterModule.forRoot(routes),
    ],
    providers: [ApiService, AuthGuard, ProductsService, CategoriesService, OrdersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
