import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Subscription } from "rxjs/Subscription";
import { Product } from "../../../shared/models/product.model";
import { ProductsService } from "../../../shared/services/products.service";
import { StorageService } from "../../../shared/services/storage.service";
import { NgFlashMessageService } from "ng-flash-messages";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  id: number;
  price: number;
  name: string;
  description: string;
  category_id: number;
  catName: string;

  s1: Subscription;
  s2: Subscription;

  constructor(
      private route: ActivatedRoute,
      private productsService: ProductsService,
      private storage: StorageService,
      private ngFlashMessageService: NgFlashMessageService
  ) { }

  ngOnInit() {
      this.s1 = this.route.params.subscribe(params => this.id = params['id']);
      this.s2 = this.productsService.getProductById(this.id)
          .subscribe( (product: Product) => {
              this.name = product.name;
              this.price = product.price;
              this.description = product.description;
              this.category_id = product.category_id;
              this.catName = product['category'].name;
          });
  }

  addToCartProduct() {
      this.storage.saveDataToLocalStorage(this.id, this.price);
      this.ngFlashMessageService.showFlashMessage({
          messages: [`Product "${this.name}" added to cart!`],
          dismissible: true,
          timeout: 3000,
          type: 'success'
      });
  }


    ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
    if (this.s2) this.s2.unsubscribe();
  }

}
