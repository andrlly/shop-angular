import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { OrderProduct } from "../models/order-product.model";

@Injectable()
export class OrderProductsService {

    constructor(private api: ApiService) {
    }

    getOrders(): Observable<OrderProduct[]> {
        return this.api.get(`orders`);
    }

    getOrderById(id): Observable<OrderProduct[]> {
        return this.api.get(`orders/${id}`)
    }

    addOrderProduct(body): Observable<OrderProduct[]> {
        return this.api.post(`orderproduct/add`, body)
            .map(data => {
                return data;
            });
    }


}