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
            })
    }

}
