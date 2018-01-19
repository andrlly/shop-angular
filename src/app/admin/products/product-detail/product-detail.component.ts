import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

import { Product } from "../../../shared/models/product.model";
import { ProductsService } from "../../../shared/services/products.service";
import { Category } from "../../../shared/models/category.model";
import { CategoriesService } from "../../../shared/services/categories.service";

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {

  id: number;
  name: string;
  description: string;
  price: number;
  count: number;
  category_id: number;
  image: string;

  @ViewChild('fileInput') fileInput: ElementRef;

  categories: Category[] = [];

  epForm: FormGroup;

  s1: Subscription;
  s2: Subscription;
  s3: Subscription;


  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private productsService: ProductsService,
      private categoriesService: CategoriesService,
      private fb: FormBuilder
  ) {
      this.createForm();
  }

  ngOnInit() {

    this.s1 = this.route.params.subscribe(params => this.id = params['id']);
    this.s2 = this.productsService.getProductById(this.id)
      .subscribe( (product: Product) => {
          this.name = product.name;
          this.description = product.description;
          this.price = product.price;
          this.count = product.count;
          this.category_id = product.category_id;

          this.epForm.setValue({
              name: this.name,
              description: this.description,
              count: this.count,
              price: this.price,
              category_id: this.category_id,
              image: null
          });
      });

      this.categoriesService.getCategories()
          .subscribe((categories: Category[]) => {
              this.categories = categories;
          });
  }

    createForm() {
        this.epForm = this.fb.group({
            name: [this.name, [Validators.required]],
            description: [this.description, [Validators.required]],
            price: [this.price, [Validators.required]],
            count: [this.count, [Validators.required, Validators.min(0)]],
            category_id: [this.category_id, [Validators.required]],
            image: null
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

    onFileChange(event) {
        let reader = new FileReader();
        if(event.target.files && event.target.files.length > 0) {
            let file = event.target.files[0];
            reader.readAsDataURL(file);
            reader.onload = () => {
                this.epForm.get('image').setValue({
                    filename: file.name,
                    filetype: file.type,
                    value: reader.result.split(',')[1]
                });
            };
        }
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
