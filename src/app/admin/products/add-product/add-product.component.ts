import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { ProductsService } from "../../../shared/services/products.service";
import { Product } from "../../../shared/models/product.model";
import { CategoriesService } from "../../../shared/services/categories.service";
import { Category } from "../../../shared/models/category.model";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, OnDestroy {


  apForm: FormGroup;
  @Input() products: Product[] = [];
  categories: Category;

  s1: Subscription;


  constructor(
      private productsService: ProductsService,
      private categoriesService: CategoriesService
  ) { }

  ngOnInit() {

      this.s1 = this.categoriesService.getCategories()
          .subscribe((categories: Category) => {
              this.categories = categories;
          });

      this.apForm = new FormGroup({
          name: new FormControl('', [Validators.required]),
          description: new FormControl('', [Validators.required]),
          count: new FormControl('', [Validators.required, Validators.min(0)]),
          category_id: new FormControl('', [Validators.required])
      });
  }

  addProductSubmit() {
    const body = this.apForm.value;
    this.productsService.addProduct(body)
        .subscribe((product: Product) => {
            body['id'] = product.id;
            console.log(body);
            this.apForm.reset();
            this.products.push(body);
        });
  }

  ngOnDestroy() {
      if (this.s1) this.s1.unsubscribe();
  }

}
