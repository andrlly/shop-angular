import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { CategoriesService } from "../../../shared/services/categories.service";
import { Category } from "../../../shared/models/category.model";

@Component({
    selector: 'app-category-editor',
    templateUrl: './category-editor.component.html',
    styleUrls: ['./category-editor.component.css']
})
export class CategoryEditorComponent implements OnInit {

    @Input() catName: string;
    @Input() category: Category;

    @Output() onEdit = new EventEmitter();

    categories: Category[] = [];

    isEdit: boolean = false;

    constructor(private categoriesService: CategoriesService) {
    }

    ngOnInit() {

        this.categoriesService.getCategories()
            .subscribe((categories: Category[]) => {
                this.categories = categories;
            });
    }

    editing(id) {
        this.updateCategory(id);
    }

    updateCategory(id) {
        this.categoriesService.updateCategory(id, this.catName)
            .subscribe((data) => {
                this.category.name = this.catName;
                this.isEdit = false;
                this.catName = '';
            });
    }

    onDeleteCategory(id) {
        this.categoriesService.deleteCategory(id)
            .subscribe(data => {
                this.categories.splice(this.categories.indexOf(id), 1);
                this.onEdit.emit();
            });

    }

}
