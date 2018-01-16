import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { ApiService } from "./api.service";
import { Category } from "../models/category.model";

@Injectable()
export class CategoriesService {
    constructor(
        private api: ApiService
    ) {}

    getCategories(): Observable<Category> {
        return this.api.get('categories');
    }

    updateCategory(id, body): Observable<Category> {
        return this.api.post(`categories/edit/${id}`, body)
            .map(data => {
                return data;
            });
    }

    deleteCategory(id): Observable<Category> {
        return this.api.get(`categories/delete/${id}`);
    }
}