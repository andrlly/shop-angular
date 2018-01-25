import { Component, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from "../../../shared/services/order.service";
import { ActivatedRoute } from "@angular/router";
import { Order } from "../../../shared/models/order.model";
import { Subscription } from "rxjs/Subscription";

@Component({
    selector: 'app-order-detail',
    templateUrl: './order-detail.component.html',
    styleUrls: ['./order-detail.component.css']
})
export class OrderDetailComponent implements OnInit, OnDestroy {

    id: number;
    user_name: string;
    user_email: string;
    user_comment: string;
    product_price: number;
    product_count: number;
    product_name: string;

    order_date: string;

    s1: Subscription;
    s2: Subscription;

    constructor(private ordersService: OrdersService,
                private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.s1 = this.route.params.subscribe(params => this.id = params['id']);
        this.s2 = this.ordersService.getOrderById(this.id)
            .subscribe((order: Order[]) => {
                this.user_name = order['user'].name;
                this.user_email = order['user'].email;
                this.user_comment = order['user'].comment;

                this.product_name = order['product'].product_name;
                this.product_price = order['product'].product_price;
                this.product_count = order['product'].product_count;

                this.order_date = order['created_at'];
            })
    }

    ngOnDestroy() {
        if (this.s1) this.s1.unsubscribe();
        if (this.s2) this.s2.unsubscribe();
    }

}
