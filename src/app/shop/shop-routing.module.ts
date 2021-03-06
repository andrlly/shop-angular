import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShopComponent } from './shop.component';
import { ProductDetailComponent } from "./products/product-detail/product-detail.component";
import { CartComponent } from "./cart/cart.component";
import { CartResolver } from "./cart/cart.resolve";
import { CheckoutComponent } from "./cart/checkout/checkout.component";
import { ThanksComponent } from "./cart/checkout/thanks/thanks.component";

const routes: Routes = [
    {
        path: '', component: ShopComponent, children: [
            {path: '', component: HomeComponent},
            {path: 'cart', component: CartComponent, resolve: {products: CartResolver}},
            {path: 'checkout', component: CheckoutComponent, resolve: {products: CartResolver}},
            {path: 'thanks', component: ThanksComponent},
            {path: 'products', component: ProductsComponent},
            {path: 'products/:id', component: ProductDetailComponent}
        ]
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class ShopRoutingModule {
}

