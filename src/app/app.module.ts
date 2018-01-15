import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { ShopModule } from './shop/shop.module';
import { AdminModule } from './admin/admin.module';
import { NotFoundComponent } from "./shared/components/not-found/not-found.component";
import { ApiService } from "./shared/services/api.service";
import { AuthService } from "./shared/services/auth.service";
import { UsersService } from "./shared/services/users.service";
import { AuthGuard } from "./shared/services/auth.guard";


const routes: Routes = [
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
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
  providers: [ApiService, AuthService, UsersService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
