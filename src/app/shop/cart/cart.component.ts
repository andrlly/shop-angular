import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product.model";

import 'rxjs/add/operator/map';
import { StorageService } from "../../shared/services/storage.service";
import { ActivatedRoute, Data } from "@angular/router";

@Component({
    selector: 'app-cart',
    templateUrl: './cart.component.html',
    styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

    products = [];
    productsCart;

    constructor(private storageService: StorageService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: Data) => {
                    this.productsCart = data.products;
                }
            );
    }

    get cart() {
        return JSON.parse(localStorage.getItem("cart"));
    }

    get total() {
        return this.productsCart.reduce((prev, next) => {
            return prev + (next.count * next.price);
        }, 0);
    }

    remove(id) {
        const removeIndex = this.productsCart.map(item => {
            return item.id;
        }).indexOf(id);
        this.storageService.removeProduct(id);
        this.productsCart.splice(removeIndex, 1);
    }

}
