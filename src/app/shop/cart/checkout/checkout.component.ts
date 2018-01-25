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
    products = [];

    user_id: number;
    checkForm: FormGroup;

    formType: string;

    constructor(private route: ActivatedRoute,
                private orderUsersService: OrderUsersService,
                private orderProductsService: OrderProductsService) {
    }

    ngOnInit() {

        this.route.data
            .subscribe((data: Data) => {
                    this.products = this.cart.sort((a, b) => {
                        +a.id > +b.id ? 1 : -1;
                    });
                    this.productsCheck = data.products.map((p, i) => {
                        return {
                            ...p,
                            ...this.products[i]
                        }
                    });
                // console.log(this.productsCheck);

                }
            );

        this.createForm();
    }

    createForm() {
        this.formType === 'loggined' ? 'Sign in' : 'Sign up';
        if (this.formType === 'registration') {
            this.checkForm.addControl('name', new FormControl('', Validators.required));
            this.checkForm.addControl('password', new FormControl('', Validators.required));
            this.checkForm.addControl('password_confirmation', new FormControl('', Validators.required));
        }
        this.checkForm = new FormGroup({
            name: new FormControl('', [Validators.required]),
            email: new FormControl('', [Validators.required, Validators.email]),
            comment: new FormControl('', [Validators.required])
        });
    }

    get cart() {
        return JSON.parse(localStorage.getItem("cart"));
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
