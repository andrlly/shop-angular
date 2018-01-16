import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";

import { CategoriesService } from "../../shared/services/categories.service";
import { Category } from "../../shared/models/category.model";

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories: Category;
  catFrom: FormGroup;

  constructor(
      private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.categoriesService.getCategories()
        .subscribe((categories: Category) => {
          this.categories = categories;
        });

    this.catFrom = new FormGroup({
        name: new FormControl('', [Validators.required])
    });

  }

  updateCategory(id) {
    this.submitCatFrom(id);
  }

  submitCatFrom(id) {
    const body = this.catFrom.value;
    this.categoriesService.updateCategory(id, body)
        .subscribe((data) => {
          console.log(data);
          this.categories.isEdit = false;
        })
  }

  onDeleteCategory(id) {
    this.categoriesService.deleteCategory(id)
        .subscribe(data => console.log(data));
  }

}
