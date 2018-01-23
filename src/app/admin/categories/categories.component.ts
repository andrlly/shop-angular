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

    categories: Category[] = [];
    category: Category;
    addCatFrom: FormGroup;

    catName: string;

    constructor(private categoriesService: CategoriesService,) {
    }

    ngOnInit() {
        this.loadCategories();

        this.addCatFrom = new FormGroup({
            name: new FormControl('', [Validators.required])
        });

    }

    editing() {
        this.loadCategories();
    }

    loadCategories() {
        this.categoriesService.getCategories()
            .subscribe((categories: Category[]) => {
                this.categories = categories;
            });
    }

    addProductSubmit() {
        const body = this.addCatFrom.value;
        this.categoriesService.addCategory(body)
            .subscribe((category: Category) => {
                body['id'] = category.id;
                this.categories.push(body);
                this.addCatFrom.reset();
            })
    }

}
