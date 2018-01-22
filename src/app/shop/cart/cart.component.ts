import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product.model";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products = [];
  productsCart;
  count: number;
  price: number;
  ids = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {

      this.products = JSON.parse(localStorage.getItem("cart"));

      this.products.forEach(product => {
          this.ids.push(product.id);
      });

      this.getCartProduct(this.ids.toString());
      // this.subtotal(150, this.count);

  }

  subtotal(price, count) {
    return  price * count;
  }

  getCartProduct(ids) {
      this.productsService.getProductByIds(ids)
          .subscribe((products: Product) => {
              this.productsCart = products;
          });
  }

  changeCount() {
      this.subtotal(this.price, this.count);
  }

  remove() {

  }

}
