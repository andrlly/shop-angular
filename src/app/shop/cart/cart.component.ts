import { Component, OnInit } from '@angular/core';
import { ApiService } from "../../shared/services/api.service";
import { ProductsService } from "../../shared/services/products.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  products: any;
  id: any;

  constructor(
      private productsService: ProductsService,
  ) { }

  ngOnInit() {
     // let products = JSON.parse(window.localStorage.getItem("products_id"));
     // this.products = products;
      let unique = JSON.parse(window.localStorage.getItem("products_id")).filter((v, i, a) => a.indexOf(v) === i);


      console.log(unique);
      unique.filter(id => {
        console.log(id);
        this.productsService.getProductById(id)
            .subscribe(p => console.log(p));
      });


  }






}
