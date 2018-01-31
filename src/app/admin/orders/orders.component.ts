import { Component, OnInit } from '@angular/core';

import { OrdersService } from "../../shared/services/order.service";
import { Order } from "../../shared/models/order.model";

@Component({
    selector: 'app-orders',
    templateUrl: './orders.component.html',
    styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

    orders;

    constructor(private ordersService: OrdersService) {
    }

    ngOnInit() {
        this.ordersService.getOrders()
            .subscribe((orders: Order[]) => {
                this.orders = orders;
            })
    }

}
