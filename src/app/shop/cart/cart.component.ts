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
    quantity = 1;


  constructor(private productsService: ProductsService,
              private storageService: StorageService,
              private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data
          .subscribe((data: Data) => {
              this.productsCart = data.products;
          }
      );

      // this.getCartProduct(this.ids);
      // this.storageService.getProductCount(this.ids);
      // this.subtotal(150, this.count);
  }

    get total() {
        return this.productsCart.reduce((prev, next) => {
            return prev + (next.count * next.price);
        }, 0);
    }

  remove(id) {
      const removeIndex = this.productsCart.map(item => { return item.id; }).indexOf(id);
      this.storageService.removeProduct(id);
      this.productsCart.splice(removeIndex, 1);
  }

}
