import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";

import { ApiService } from "./api.service";
import { Product } from "../models/product.model";

@Injectable()
export class ProductsService {

    constructor(private api: ApiService) {}

    getProducts(): Observable<Product[]> {
        return this.api.get('products');
    }

    getProductById(id: number): Observable<Product> {
        return this.api.get(`products/${id}`)
            .map(data => {
                return data;
            });
    }

    getProductByIds(ids) {
        return this.api.post(`productsArr`, {ids: ids})
            .map(data => {
                return data;
            });
    }

    addProduct(body): Observable<Product> {
        return this.api.post(`product/add`, body)
            .map(data => {
                return data;
            });
    }

    editProduct(id, body): Observable<Product> {
        return this.api.post(`product/edit/${id}`, body)
            .map(data => {
                return data;
            })
    }

    deleteProduct(id): Observable<Product> {
        return this.api.get(`product/delete/${id}`)
            .map(data => {
                return data;
            })
    }
}