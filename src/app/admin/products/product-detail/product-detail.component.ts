import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { Product } from "../../../shared/models/product.model";
import { ProductsService } from "../../../shared/services/products.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  id: number;
  name: string;
  description: string;
  count: number;
  category_id: number;

  epForm: FormGroup;

  s1: Subscription;
  s2: Subscription;
  s3: Subscription;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private productsService: ProductsService
  ) { }

  ngOnInit() {

    this.s1 = this.route.params.subscribe(params => this.id = params['id']);
    this.s2 = this.productsService.getProductById(this.id)
      .subscribe( (product: Product) => {
          this.name = product.name;
          this.description = product.description;
          this.count = product.count;
          this.category_id = product.category_id;

          this.epForm.setValue({
              name: this.name,
              description: this.description,
              count: this.count,
              category_id: this.category_id
          });
      });

      this.epForm = new FormGroup({
          name: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          count: new FormControl('', [Validators.required, Validators.min(0)]),
          category_id: new FormControl('', [Validators.required])
      });

  }

  editProductSubmit() {
    const body = this.epForm.value;
    this.s3 = this.productsService.editProduct(this.id, body)
        .subscribe((product: Product) => {
            console.log(product);
            console.log('product edited!');
        });
  }

  deleteProduct() {
    this.productsService.deleteProduct(this.id)
        .subscribe(() => {
            this.router.navigate(['/admin/products']);
    });

  }

  ngOnDestroy() {
    if (this.s1) this.s1.unsubscribe();
    if (this.s2) this.s2.unsubscribe();
    if (this.s3) this.s3.unsubscribe();
  }
}
