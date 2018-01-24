import { Component, OnInit } from '@angular/core';

import { OrderProductsService } from "../../shared/services/order-products.service";
import { OrderProduct } from "../../shared/models/order-product.model";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    orders;

    constructor(private orderProductsService: OrderProductsService) {
    }

    ngOnInit() {
        this.orderProductsService.getOrders()
            .subscribe((orders: OrderProduct[]) => {
                console.log(orders);
                this.orders = orders;
            })
    }

}
