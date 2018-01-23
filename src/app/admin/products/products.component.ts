import { Component, OnInit } from '@angular/core';
import { Product } from "../../shared/models/product.model";
import { ProductsService } from "../../shared/services/products.service";

@Component({
    selector: 'app-products',
    templateUrl: './products.component.html',
    styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

    products: Product[] = [];
    updated_at: number;

    constructor(private productsService: ProductsService) {
    }

    ngOnInit() {
        this.productsService.getProducts()
            .subscribe((products: Product[]) => {
                this.products = products;
                products.forEach(p => {
                    // this.updated_at = new Date(p.updated_at).getTime();
                });
                // this.updated_at = new Date(products[0].updated_at).getTime();
            })
    }

}
