import { Injectable } from "@angular/core";

import { ApiService } from "./api.service";
import { Observable } from "rxjs/Observable";
import { Order } from "../models/order.model";

@Injectable()
export class OrdersService {

    constructor(private api: ApiService) {
    }

    getOrders(): Observable<Order[]> {
        return this.api.get(`orders`);
    }

    getOrderById(id): Observable<Order[]> {
        return this.api.get(`order/${id}`)
    }

    addOrder(body): Observable<Order[]> {
        return this.api.post(`order/add`, body)
            .map(data => {
                return data;
            });
    }


}