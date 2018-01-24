import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { OrderProductsService } from "../../../shared/services/order-products.service";
import { Observable } from "rxjs/Rx";
import { Subscription } from "rxjs/Subscription";
import { OrderUsersService } from "../../../shared/services/order-users.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    productsCheck;

    user_id: number;

    checkForm: FormGroup;

    constructor(private route: ActivatedRoute,
                private orderUsersService: OrderUsersService,
                private orderProductsService: OrderProductsService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((data: Data) => {
                    this.productsCheck = data.products;
                }
            );

        this.createForm();
    }

    createForm() {
        this.checkForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            comment: new FormControl('', [Validators.required])
        });
    }

    get total() {
        return this.productsCheck.reduce((prev, next) => {
            return prev + (next.count * next.price);
        }, 0);
    }

    submitForm() {
        const user_data = {
            'name': this.checkForm.value.name,
            'email': this.checkForm.value.email,
            'comment': this.checkForm.value.comment,
        };



        // Observable.combineLatest(
        //     this.orderProductsService.addOrderProduct(product_data),
            this.orderUsersService.addOrderUser(user_data)
                .subscribe(res => {
                    console.log(res);
                    console.log(res['id']);
                    this.user_id = res['id'];

                });
        // ).subscribe((res) => {
            // this.bill = data[0];
            // this.currency = data[1];
            // this.isLoaded = true;
            // console.log(res[0]);
            // console.log(res[1]);
        // });


        const product_data = {
            // 'price': this.productsCheck.price,
            'price': 400,
            'count': 2,
            'product_id': 1,
            'order_user_id': this.user_id,
        };

        this.orderProductsService.addOrderProduct(product_data)
            .subscribe(res => console.log(res));
            // .subscribe(res => console.log(res));
    }
}