import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from "@angular/router";
import { FormControl, FormGroup, Validators } from "@angular/forms";
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


    constructor(private route: ActivatedRoute,
                private ordersService: OrdersService,
                private authService: AuthService) {
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

                }
            );

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

    get cart() {
        return JSON.parse(localStorage.getItem("cart"));
    }

    get total() {
        return this.productsCheck.reduce((prev, next) => {
            return prev + (next.count * next.price);
        }, 0);
    }

    submitForm() {

        if (!this.isLoggedIn) {
            const credentials = this.checkForm.value;
            this.authService.attemptAuth('register', credentials)
                .subscribe(res => {
                    this.isLoggedIn = null;
                    this.user_id = res['id'];
                });
        }
        this.authService.getUserById(this.user_id)
            .subscribe(res => console.log(res));


        const product_data = {
            'products': this.productsCheck,
            'user_id': this.user_id,
        };

        console.log(product_data);

        this.ordersService.addOrder(product_data)
            .subscribe(res => console.log(res));
    }
}
