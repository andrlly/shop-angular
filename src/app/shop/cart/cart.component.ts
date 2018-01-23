import { Component, OnInit } from '@angular/core';
import { ProductsService } from "../../shared/services/products.service";
import { Product } from "../../shared/models/product.model";

import 'rxjs/add/operator/map';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  // products: Product[] = [];
  productsCart: Product[] = [];
  count: number;
  price: number;
  // ids: any = [];

  constructor(private productsService: ProductsService) { }

  ngOnInit() {

      const ids = JSON.parse(localStorage.getItem("cart")).map(product => product.id).toString();
      this.getCartProduct(ids);
      // this.subtotal(150, this.count);
  }

  // subtotal(price, count) {
  //   return  price * count;
  // }

  getCartProduct(ids) {
      this.productsService.getProductByIds(ids)
          .subscribe((products: Product[]) => {
              console.log(products);
              this.productsCart = products;
          });
  }

    subtotal() {
        // return this.productsCart.reduce((acc, item) => {
        //     console.log(acc);
        //     console.log(item);
        //     return item.cost * item.qty;
        // }, 0);
    }

  changeCount() {
      // console.log(this.subtotal());
      // this.subtotal();
      //
      // const currentProduct = this.productsCart.find(p => p.id === id);
      // if(currentProduct) {
      //     const currentProductIndex = this.productsCart.findIndex(p => p.id === id);
      //     this.productsCart[currentProductIndex].count += 1;
      // } else {
      //     this.productsCart.push({count: this.count});
      // }

  }

  remove(id) {
      // console.log(id);
      const deleted = this.productsCart.map(p => p)
      console.log(deleted);
      // this.productsCart.splice(this.productsCart.indexOf(id), 1);

      // delete (this.productsCart[currentProductIndex]);
  }

}
