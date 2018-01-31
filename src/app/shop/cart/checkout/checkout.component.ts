import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { NgFlashMessageService } from "ng-flash-messages";

import { OrdersService } from "../../../shared/services/order.service";
import { AuthService } from "../../../admin/auth/auth.service";

@Component({
    selector: 'app-checkout',
    templateUrl: './checkout.component.html',
    styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

    productsCheck;
    products = [];
    isLoggedIn = +this.authService.isLoggedIn();
    user_id: number;
    checkForm: FormGroup;


    constructor(private router: Router,
                private ordersService: OrdersService,
                private authService: AuthService,
                private ngFlashMessageService: NgFlashMessageService) {
    }

    ngOnInit() {
        this.productsCheck = this.checkout;
        this.createForm();
    }

    createForm() {
        if (this.isLoggedIn) {
            this.checkForm = new FormGroup({
                comment: new FormControl('', [Validators.required])
            });
        } else {
            this.checkForm = new FormGroup({
                name: new FormControl('', [Validators.required]),
                email: new FormControl('', [Validators.required, Validators.email]),
                password: new FormControl('', [Validators.required]),
                password_confirmation: new FormControl('', [Validators.required]),
                comment: new FormControl('', [Validators.required]),
            });
        }
    }

    get checkout() {
        return JSON.parse(localStorage.getItem("checkout"));
    }

    get total() {
        return this.productsCheck.reduce((prev, next) => {
            return prev + (next.count * next.price);
        }, 0);
    }

    submitForm() {

        const product_data = {
            "data": this.productsCheck,
            "user_id": this.isLoggedIn,
        };
        if (!this.isLoggedIn) {
            const credentials = this.checkForm.value;
            this.authService.attemptAuth("register", credentials)
                .subscribe(res => {
                    product_data.user_id = +res;
                    this.ordersService.addOrder(product_data)
                        .subscribe(order =>  {
                            this.ngFlashMessageService.showFlashMessage({
                                messages: [`Thanks you for order`],
                                dismissible: true,
                                timeout: 3000,
                                type: 'success'
                            });
                            setTimeout(() => {
                                this.router.navigate(['/thanks']);
                            }, 3500);
                        });
                });
        } else {
            this.ordersService.addOrder(product_data)
                .subscribe(order => {
                    this.ngFlashMessageService.showFlashMessage({
                        messages: [`Thanks you for order`],
                        dismissible: true,
                        timeout: 3000,
                        type: 'success'
                    });
                    setTimeout(() => {
                        this.router.navigate(['/thanks']);
                    }, 3500);

                });
        }
    }


}
